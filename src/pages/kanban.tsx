import KanbanBoard from "@/components/kanban/kanban-board";
import GoBack from "@/components/shared/go-back";
import Heading from "@/components/shared/heading";

export default function Kanban() {
  return (
    <>
      <Heading text="Kanban Stunk" />
      <div className="container mx-auto px-4 py-8">
        <KanbanBoard />
      </div>
      <GoBack />
    </>
  );
}
