import { useState } from "react";

import { useChunk } from "stunk/react";

import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";

import TaskForm from "./kanban-form";
import KanbanColumn from "./kanaban-column";

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
      <div className="flex flex-col justify-between sm:flex-row items-center mb-6 px-4 py-3 bg-white rounded">
        <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowAddTaskForm(true)}
        >
          Add Task
        </button>
      </div>

      {showAddTaskForm && (
        <TaskForm onClose={() => setShowAddTaskForm(false)} />
      )}

      <div className="flex flex-1 gap-4 overflow-x-auto p-4">
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
