import { useDroppable } from "@dnd-kit/core";

import { Task } from "@/store/kanban-store";
import TaskCard from "./kanban-task-card";

type KanbanColumnProps = {
  columnId: string;
  title: string;
  tasks: Task[];
};

export default function KanbanColumn({
  columnId,
  title,
  tasks,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${columnId}`,
  });

  const columnStyle = {
    backgroundColor: isOver ? "#f3f4f6" : "#ffffff",
    borderColor: isOver ? "#6366f1" : "#e5e7eb",
  };

  return (
    <div
      ref={setNodeRef}
      style={columnStyle}
      className="flex flex-col w-80 min-h-96 bg-white rounded border-2 transition-colors duration-200 px-3"
    >
      <div className="p-3 border-b bg-gray-50 rounded-t">
        <h2 className="font-semibold text-lg flex items-center justify-between text-indigo-600">
          {title}
          <span className="bg-gray-200 text-gray-700 text-sm py-1 px-2 rounded-full">
            {tasks.length}
          </span>
        </h2>
      </div>

      <div className="flex-1 p-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {tasks.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic text-sm">
            No tasks yet
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
