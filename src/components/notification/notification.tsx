import { useState } from "react";
import { useChunk } from "stunk/react";

import { notificationsChunk, removeNotification } from "@/store/noti-store";

import { getAlertClass } from "@/utils";

export default function Notifications() {
  const [notifications] = useChunk(notificationsChunk);
  const [fadingOut, setFadingOut] = useState<Record<string, boolean>>({});

  const handleRemove = (id: string) => {
    setFadingOut((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => removeNotification(id), 300);
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2">
      {notifications.map((notif) => {
        const alertClass = getAlertClass(notif.type, notif.variant);
        return (
          <div
            className={`w-fit max-w-xs flex items-center justify-between gap-2 px-4 py-3 rounded-md shadow-md transition-opacity duration-300 ${
              fadingOut[notif.id] ? "animate-fadeOut" : "animate-fadeIn"
            } ${alertClass}`}
            key={notif.id}
            role="alert"
          >
            <span className="break-words">{notif.message}</span>
            <button
              onClick={() => handleRemove(notif.id)}
              className="btn btn-sm bg-transparent text-inherit border-none shadow-none hover:bg-transparent focus:ring-0"
            >
              ✖
            </button>
          </div>
        );
      })}
    </div>
  );
}
