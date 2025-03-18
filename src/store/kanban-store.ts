import { chunk } from "stunk";
import { withPersistence } from "stunk/middleware";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
}

export type KanbanState = {
  tasks: Task[];
  columns: {
    id: TaskStatus;
    title: string;
  }[];
}

const initialState: KanbanState = {
  tasks: [
    {
      id: "task-1",
      title: "Create project setup",
      description: "Set up the initial project structure and dependencies",
      status: "todo",
      priority: "high",
      createdAt: new Date().toISOString(),
    },
    {
      id: "task-2",
      title: "Design UI components",
      description: "Create reusable UI components for the application",
      status: "in-progress",
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
    {
      id: "task-3",
      title: "Implement authentication with Stunk",
      description: "Add user authentication and authorization",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "task-4",
      title: "Write documentation",
      description: "Document the API and components",
      status: "review",
      priority: "low",
      createdAt: new Date().toISOString(),
    },
    {
      id: "task-5",
      title: "Fix bugs in login form",
      description: "Address validation issues in the login form",
      status: "done",
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
  ],
  columns: [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ],
};

export const kanbanChunk = withPersistence(chunk(initialState), {
  key: "kanban-board",
});

export const addTask = (task: Omit<Task, "id" | "createdAt">) => {
  kanbanChunk.set((prev) => ({
    ...prev,
    tasks: [
      ...prev.tasks,
      {
        ...task,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
    ],
  }));
};

export const updateTask = (taskId: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
  kanbanChunk.set((prev) => ({
    ...prev,
    tasks: prev.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    ),
  }));
};

export const deleteTask = (taskId: string) => {
  kanbanChunk.set((prev) => ({
    ...prev,
    tasks: prev.tasks.filter((task) => task.id !== taskId),
  }));
};

export const moveTask = (taskId: string, newStatus: TaskStatus) => {
  kanbanChunk.set((prev) => ({
    ...prev,
    tasks: prev.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ),
  }));
};

export const getTasksByStatus = (status: TaskStatus, tasks: Task[]) => {
  return tasks.filter((task) => task.status === status);
};
