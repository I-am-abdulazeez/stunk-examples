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

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-80 min-h-96 bg-base-200 rounded-lg border-2 transition-all duration-200 ${
        isOver ? "border-[#2af4c2] bg-[#2af4c2]/5" : "border-base-300"
      }`}
    >
      <div className="p-4 border-b border-base-300">
        <h2 className="font-bold text-lg flex items-center justify-between">
          <span>{title}</span>
          <div className="badge badge-lg bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30">
            {tasks.length}
          </div>
        </h2>
      </div>

      <div className="flex-1 p-3 overflow-y-auto max-h-[calc(100vh-300px)]">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-2 opacity-20">📋</div>
            <p className="text-sm opacity-60">No tasks yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
