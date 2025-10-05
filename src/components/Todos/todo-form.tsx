import { batch } from "stunk";
import { useChunk } from "stunk/react";
import { Plus, X, FolderPlus } from "lucide-react";

import {
  categoriesChunk,
  newCategoryChunk,
  newTodoChunk,
  selectedCategoryChunk,
  showCategoryFormChunk,
  todosChunk,
} from "@/store/todo-store";
import TodoCategory from "./todos-category";
import TodoFilter from "./todos-filter";

export default function TodoForm() {
  const [todos, setTodos] = useChunk(todosChunk);
  const [showCategoryForm, setShowCategoryForm] = useChunk(
    showCategoryFormChunk
  );
  const [newTodo, setNewTodo] = useChunk(newTodoChunk);
  const [selectedCategory, setSelectedCategory] = useChunk(
    selectedCategoryChunk
  );
  const [categories, setCategories] = useChunk(categoriesChunk);
  const [newCategory, setNewCategory] = useChunk(newCategoryChunk);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTodoObj = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      categoryId: selectedCategory,
      createdAt: new Date(),
    };

    batch(() => {
      setTodos([...todos, newTodoObj]);
      setNewTodo("");
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const newCategoryObj = {
      id: Date.now().toString(),
      name: newCategory,
    };

    batch(() => {
      setCategories([...categories, newCategoryObj]);
      setNewCategory("");
      setShowCategoryForm(false);
      setSelectedCategory(newCategoryObj.id);
    });
  };

  return (
    <div className="card bg-base-200 border border-base-300 sticky top-4">
      <div className="card-body p-6">
        <h2 className="card-title text-lg mb-4">
          <Plus className="w-5 h-5 text-[#2af4c2]" />
          Add New Task
        </h2>

        <TodoFilter />

        <form onSubmit={handleAddTodo} className="space-y-4 mt-4">
          <div className="form-control">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered flex-1"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              className={`btn btn-square ${
                showCategoryForm ? "btn-error" : "btn-ghost"
              }`}
            >
              {showCategoryForm ? (
                <X className="w-5 h-5" />
              ) : (
                <FolderPlus className="w-5 h-5" />
              )}
            </button>
          </div>

          {showCategoryForm && (
            <div className="alert">
              <div className="w-full">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <FolderPlus className="w-4 h-4" />
                  Add New Category
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Category name"
                    className="input input-bordered input-sm flex-1"
                  />
                  <button
                    className="btn btn-sm bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900"
                    onClick={handleAddCategory}
                  >
                    Add
                  </button>
                </div>
                <TodoCategory />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 w-full font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
