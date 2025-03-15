import { useChunk } from "stunk/react";
import { todosChunk } from "@/store/todo-store";

export default function TodoHistory() {
  useChunk(todosChunk);

  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        aria-disabled={!todosChunk.canUndo()}
        className={`btn btn-lg ${!todosChunk.canUndo() && "btn-disabled"}`}
        onClick={() => todosChunk.undo()}
      >
        Undo
      </button>
      <button
        className={`btn btn-lg ${!todosChunk.canRedo() && "btn-disabled"}`}
        onClick={() => todosChunk.redo()}
      >
        Redo
      </button>
    </div>
  );
}
