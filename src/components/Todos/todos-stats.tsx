import { useDerive } from "stunk/react";
import { todosChunk } from "../../store/todo-store";

export default function TodosStat() {
  const stats = useDerive(todosChunk, (allTodos) => {
    return {
      total: allTodos.length,
      completed: allTodos.filter((todo) => todo.completed).length,
      active: allTodos.filter((todo) => !todo.completed).length,
    };
  });

  return (
    <div className="stats w-full">
      <div className="stat">
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value">{stats.total}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Completed</div>
        <div className="stat-value text-success">{stats.completed}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Active</div>
        <div className="stat-value text-secondary">{stats.active}</div>
      </div>
    </div>
  );
}
