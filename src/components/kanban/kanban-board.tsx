import { useState } from "react";
import { useChunk } from "stunk/react";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { Plus, LayoutGrid } from "lucide-react";

import TaskForm from "./kanban-form";
import KanbanColumn from "./kanban-column";

import {
  kanbanChunk,
  getTasksByStatus,
  moveTask,
  TaskStatus,
} from "@/store/kanban-store";

export default function KanbanBoard() {
  const [{ tasks, columns }] = useChunk(kanbanChunk);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (overId.startsWith("column-")) {
      const newStatus = overId.replace("column-", "") as TaskStatus;
      moveTask(activeId, newStatus);
      return;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="card bg-base-200 border border-base-300 mb-6">
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-6 h-6 text-[#2af4c2]" />
              <div>
                <h1 className="text-2xl font-bold">Project Tasks</h1>
                <p className="text-sm opacity-60 text-left">
                  {tasks.length} total tasks
                </p>
              </div>
            </div>
            <button
              className="btn bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold gap-2"
              onClick={() => setShowAddTaskForm(true)}
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {showAddTaskForm && (
        <TaskForm onClose={() => setShowAddTaskForm(false)} />
      )}

      <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              columnId={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id, tasks)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
