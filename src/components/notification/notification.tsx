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
      {notifications.map((notif) => (
        <div
          className={`flex justify-between items-center gap-2 transition-opacity duration-300 ${
            fadingOut[notif.id] ? "animate-fadeOut" : "animate-fadeIn"
          } alert ${getAlertClass(notif.type, notif.variant)}`}
          key={notif.id}
          role="alert"
        >
          <span>{notif.message}</span>
          <button
            onClick={() => handleRemove(notif.id)}
            className="btn btn-sm bg-transparent text-inherit border-none shadow-none hover:bg-transparent focus:ring-0"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
