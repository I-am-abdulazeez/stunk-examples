import Heading from "@/components/shared/heading";
import TodosStat from "@/components/Todos/todos-stats";
import TodoForm from "@/components/Todos/todo-form";
import TodoList from "@/components/Todos/todo-list";
import TodoHistory from "@/components/Todos/todo-history";
import GoBack from "@/components/shared/go-back";

export default function Todo() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Heading text="Todo List" />
        <TodosStat />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <TodoForm />
            <TodoHistory />
          </div>

          {/* Right Column - List */}
          <div className="lg:col-span-2">
            <TodoList />
          </div>
        </div>

        <GoBack />
      </div>
    </div>
  );
}
