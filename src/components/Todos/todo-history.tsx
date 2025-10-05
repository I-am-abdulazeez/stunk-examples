import { useChunk } from "stunk/react";
import { Undo2, Redo2 } from "lucide-react";
import { todosChunk } from "@/store/todo-store";

export default function TodoHistory() {
  useChunk(todosChunk);

  const canUndo = todosChunk.canUndo();
  const canRedo = todosChunk.canRedo();

  return (
    <div className="card bg-base-200 border border-base-300 mt-4">
      <div className="card-body p-4">
        <div className="flex gap-2">
          <button
            disabled={!canUndo}
            className="btn btn-outline btn-sm flex-1 gap-2"
            onClick={() => todosChunk.undo()}
          >
            <Undo2 className="w-4 h-4" />
            Undo
          </button>
          <button
            disabled={!canRedo}
            className="btn btn-outline btn-sm flex-1 gap-2"
            onClick={() => todosChunk.redo()}
          >
            <Redo2 className="w-4 h-4" />
            Redo
          </button>
        </div>

        <div className="flex gap-2 mt-2">
          <div
            className={`badge badge-xs flex-1 ${
              canUndo ? "badge-success" : "badge-ghost opacity-30"
            }`}
          >
            {canUndo ? "✓" : "○"} Undo
          </div>
          <div
            className={`badge badge-xs flex-1 ${
              canRedo ? "badge-success" : "badge-ghost opacity-30"
            }`}
          >
            {canRedo ? "✓" : "○"} Redo
          </div>
        </div>
      </div>
    </div>
  );
}
