import { useChunk, useChunkValue, useComputed } from "stunk/react";
import { Trash2, Calendar } from "lucide-react";

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
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body p-6">
        {filteredTodos.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-6xl mb-4 opacity-20">📝</div>
            <p className="text-xl font-semibold opacity-70">No tasks found</p>
            <p className="text-sm opacity-50 mt-2">
              Add some tasks or change your filter
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodos.map((todo) => {
              const category = categories.find((c) => c.id === todo.categoryId);

              return (
                <div
                  key={todo.id}
                  className="card bg-base-100 border border-base-300 hover:border-[#2af4c2]/50 transition-colors"
                >
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="checkbox checkbox-success mt-1"
                      />

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium text-lg text-left ${
                            todo.completed ? "line-through opacity-50" : ""
                          }`}
                        >
                          {todo.text}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="badge badge-sm bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30">
                            {category?.name}
                          </div>
                          <div className="badge badge-sm badge-ghost gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(todo.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
