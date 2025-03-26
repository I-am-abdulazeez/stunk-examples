import { useChunk, useChunkValue, useComputed } from "stunk/react";

import { DeleteIcon } from "../icons";

import { categoriesChunk, filterChunk, todosChunk } from "@/store/todo-store";

export default function TodoList() {
  const categories = useChunkValue(categoriesChunk);
  const [todos, setTodos] = useChunk(todosChunk);

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useComputed(
    [todosChunk, filterChunk],
    (allTodos, currentFilter) => {
      if (currentFilter === "all") return allTodos;
      if (currentFilter === "completed")
        return allTodos.filter((todo) => todo.completed);
      if (currentFilter === "active")
        return allTodos.filter((todo) => !todo.completed);
      if (currentFilter.startsWith("category-")) {
        const categoryId = currentFilter.replace("category-", "");
        return allTodos.filter((todo) => todo.categoryId === categoryId);
      }
      return allTodos;
    }
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {filteredTodos.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p className="text-xl">No tasks found</p>
          <p>Add some tasks or change your filter</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredTodos.map((todo) => {
            const category = categories.find((c) => c.id === todo.categoryId);

            return (
              <li
                key={todo.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-start flex-1 gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="checkbox checkbox-primary mt-1"
                  />
                  <div>
                    <p
                      className={`${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      } font-medium text-xl text-left`}
                    >
                      {todo.text}
                    </p>
                    <div className="flex gap-2 items-center">
                      <span className="bg-cyan-300 text-sm font-medium px-1 text-gray-800 rounded-md">
                        {category?.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-circle btn-error btn-sm"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
