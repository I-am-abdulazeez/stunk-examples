import { chunk } from "stunk";

import { NotiType, NotiVariant } from "@/utils";

export type Notification = {
  id: string;
  message: string;
  type: NotiType,
  variant: NotiVariant
};

export const notificationsChunk = chunk<Notification[]>([]);

export const addNotification = (message: string, type: NotiType, variant: NotiVariant) => {
  const id = crypto.randomUUID();
  notificationsChunk.set((prev) => [...prev, { id, message, type, variant }]);

  setTimeout(() => removeNotification(id), 4000);
};

export const removeNotification = (id: string) => {
  notificationsChunk.set((prev) => prev.filter((n) => n.id !== id));
};
