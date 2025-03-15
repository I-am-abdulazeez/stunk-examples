import { useChunk } from "stunk/react";

import { filterChunk } from "@/store/todo-store";

export default function TodoFilter() {
  const [filter, setFilter] = useChunk(filterChunk);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        className={`btn btn-sm ${
          filter === "all" ? "btn-primary" : "btn-neutral"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`btn btn-sm ${
          filter === "active" ? "btn-secondary" : "btn-neutral"
        }`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={`btn btn-sm ${
          filter === "completed" ? "btn-accent" : "btn-neutral"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}
