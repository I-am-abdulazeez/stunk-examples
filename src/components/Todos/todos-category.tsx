import { useChunk } from "stunk/react";

import { categoriesChunk, filterChunk, todosChunk } from "@/store/todo-store";

export default function TodoCategory() {
  const [categories, setCategories] = useChunk(categoriesChunk);
  const [filter, setFilter] = useChunk(filterChunk);

  const [todos] = useChunk(todosChunk);

  const deleteCategory = (id: string) => {
    const hasAssociatedTodos = todos.some((todo) => todo.categoryId === id);

    if (hasAssociatedTodos) {
      alert("Cannot delete a category that has associated todos");
      return;
    }

    setCategories(categories.filter((category) => category.id !== id));
  };

  return categories.map((category) => (
    <div key={category.id} className="dropdown dropdown-hover">
      <label
        tabIndex={0}
        className={`btn btn-sm ${
          filter === `category-${category.id}` ? "btn-info" : "btn-neutral"
        }`}
        onClick={() => setFilter(`category-${category.id}`)}
      >
        {category.name}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            onClick={() => deleteCategory(category.id)}
            className="text-error"
          >
            Delete Category
          </button>
        </li>
      </ul>
    </div>
  ));
}
