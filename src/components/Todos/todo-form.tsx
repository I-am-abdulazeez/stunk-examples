import { batch } from "stunk";
import { useChunk } from "stunk/react";

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
    <div className="border-gray-50 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h2>
      <TodoFilter />
      <form onSubmit={handleAddTodo} className="flex flex-col gap-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="input input-bordered w-full input-lg"
          required
        />

        <div className="flex gap-2 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered select-lg flex-grow"
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
            className="btn btn-circle btn-md text-2xl"
          >
            {showCategoryForm ? "×" : "+"}
          </button>
        </div>

        {showCategoryForm && (
          <div className="p-4 rounded-md border border-gray-600">
            <h3 className="text-md font-medium mb-2">Add New Category</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name"
                className="input input-bordered input-md flex-grow"
              />
              <button
                className="btn btn-md btn-primary"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
            <div className="mt-4 flex gap-3">
              <TodoCategory />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg">
          Add Task
        </button>
      </form>
    </div>
  );
}
