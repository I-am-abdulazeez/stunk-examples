import { useState } from "react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { Task, deleteTask } from "@/store/kanban-store";
import TaskForm from "./kanban-form";
import { DeleteIcon, EditIcon } from "../icons";

export default function TaskCard({ task }: { task: Task }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <>
      {showEditForm ? (
        <TaskForm task={task} onClose={() => setShowEditForm(false)} />
      ) : (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="p-3 mb-2 bg-white border rounded shadow-sm cursor-grab hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-800 text-left">
              {task.title}
            </h3>
            <div className="flex space-x-1">
              <button
                onClick={() => setShowEditForm(true)}
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag from interfering
                className="btn btn-ghost btn-sm text-gray-500 hover:bg-transparent hover:shadow-none hover:border-0"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag from interfering
                className="btn btn-ghost btn-sm text-red-500 hover:bg-transparent hover:shadow-none hover:border-0"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 text-left">
            {task.description}
          </p>

          <div className="flex justify-between items-center">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>

            {task.dueDate && (
              <span className="text-xs text-gray-500">
                Due {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
