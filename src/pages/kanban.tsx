import KanbanBoard from "@/components/kanban/kanban-board";
import GoBack from "@/components/shared/go-back";
import Heading from "@/components/shared/heading";

export default function Kanban() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <Heading text="Kanban Board" />
        <KanbanBoard />
        <div className="mt-6">
          <GoBack />
        </div>
      </div>
    </div>
  );
}
