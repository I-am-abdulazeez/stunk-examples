import { useDerive } from "stunk/react";
import { CheckCircle2, Circle, ListTodo } from "lucide-react";
import { todosChunk } from "../../store/todo-store";

export default function TodosStat() {
  const stats = useDerive(todosChunk, (allTodos) => {
    return {
      total: allTodos.length,
      completed: allTodos.filter((todo) => todo.completed).length,
      active: allTodos.filter((todo) => !todo.completed).length,
    };
  });

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70 font-medium">Total Tasks</div>
              <div className="text-4xl font-bold mt-1">{stats.total}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#2af4c2]/10">
              <ListTodo className="w-8 h-8 text-[#2af4c2]" />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300">
        <div className="card-body p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70 font-medium">Completed</div>
              <div className="text-4xl font-bold mt-1 text-success">
                {stats.completed}
              </div>
              <div className="text-xs opacity-60 mt-1">
                {completionRate}% done
              </div>
            </div>
            <div className="p-3 rounded-xl bg-success/10">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300">
        <div className="card-body p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70 font-medium">Active</div>
              <div className="text-4xl font-bold mt-1 text-warning">
                {stats.active}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-warning/10">
              <Circle className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
