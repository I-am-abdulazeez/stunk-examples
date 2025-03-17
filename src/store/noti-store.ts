import { chunk } from "stunk";

export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning",
  variant: "default" | "soft" | "outline" | "dashed"
};

export const notificationsChunk = chunk<Notification[]>([]);

export const addNotification = (
  message: string,
  type: "success" | "error" | "info" | "warning",
  variant: "default" | "soft" | "outline" | "dashed" = "default"
) => {
  const id = crypto.randomUUID();
  notificationsChunk.set((prev) => [...prev, { id, message, type, variant }]);

  setTimeout(() => removeNotification(id), 3000);
};

export const removeNotification = (id: string) => {
  notificationsChunk.set((prev) => prev.filter((n) => n.id !== id));
};
