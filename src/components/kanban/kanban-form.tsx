import { useState } from "react";
import { X, Save, Calendar, Flag, FileText, Edit3 } from "lucide-react";

import {
  Task,
  TaskPriority,
  TaskStatus,
  addTask,
  updateTask,
} from "@/store/kanban-store";

type TaskFormProps = {
  task?: Task;
  onClose: () => void;
};

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || ("todo" as TaskStatus),
    priority: task?.priority || ("medium" as TaskPriority),
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title: formData.title,
      description: formData.description,
      status: formData.status as TaskStatus,
      priority: formData.priority as TaskPriority,
      dueDate: formData.dueDate || undefined,
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card bg-base-200 border border-base-300 w-full max-w-lg">
        <div className="card-body p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Edit3 className="w-6 h-6 text-[#2af4c2]" />
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-square"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <div className="mb-2">
                <span className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2af4c2]" />
                  Title
                </span>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="form-control text-left">
              <div className="mb-2">
                <span className="font-semibold">Description</span>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="textarea textarea-bordered w-full"
                placeholder="Add task description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control text-left">
                <div className="mb-2">
                  <span className="font-semibold">Status</span>
                </div>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div className="form-control">
                <div className="mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Flag className="w-4 h-4 text-[#2af4c2]" />
                    Priority
                  </span>
                </div>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <div className="mb-2">
                <span className="font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2af4c2]" />
                  Due Date (Optional)
                </span>
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold flex-1 gap-2"
              >
                <Save className="w-4 h-4" />
                {task ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
