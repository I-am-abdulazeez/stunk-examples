import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Edit2, Trash2, Calendar } from "lucide-react";

import { Task, deleteTask } from "@/store/kanban-store";
import TaskForm from "./kanban-form";

export default function TaskCard({ task }: { task: Task }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityConfig = {
    low: { bg: "bg-success/10", text: "text-success", badge: "badge-success" },
    medium: {
      bg: "bg-warning/10",
      text: "text-warning",
      badge: "badge-warning",
    },
    high: { bg: "bg-error/10", text: "text-error", badge: "badge-error" },
  };

  const config = priorityConfig[task.priority];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditForm(true);
  };

  return (
    <>
      {showEditForm ? (
        <TaskForm task={task} onClose={() => setShowEditForm(false)} />
      ) : (
        <div
          ref={setNodeRef}
          style={style}
          className="card bg-base-100 border border-base-300 hover:border-[#2af4c2]/50 transition-all cursor-grab active:cursor-grabbing"
        >
          <div className="card-body p-4">
            <div className="flex items-start gap-2">
              <div {...attributes} {...listeners} className="cursor-grab mt-1">
                <GripVertical className="w-4 h-4 opacity-40" />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <h3 className="font-bold text-base mb-2">{task.title}</h3>

                {task.description && (
                  <p className="text-sm opacity-70 mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <div className={`badge badge-sm ${config.badge}`}>
                    {task.priority}
                  </div>

                  {task.dueDate && (
                    <div className="badge badge-sm badge-ghost gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(task.dueDate)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-1 mt-2 pt-2 border-t border-base-300">
              <button
                onClick={handleEdit}
                className="btn btn-ghost btn-xs flex-1 gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-ghost btn-xs flex-1 gap-1 text-error hover:bg-error/10"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
