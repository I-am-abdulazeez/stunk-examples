import Heading from "@/components/shared/heading";
import TodosStat from "@/components/Todos/todos-stats";
import TodoForm from "@/components/Todos/todo-form";
import TodoList from "@/components/Todos/todo-list";
import TodoHistory from "@/components/Todos/todo-history";
import GoBack from "@/components/shared/go-back";

export default function Todo() {
  return (
    <div>
      <Heading text="Todo List" />
      <TodosStat />
      <TodoForm />
      <TodoList />
      <TodoHistory />
      <GoBack />
    </div>
  );
}
