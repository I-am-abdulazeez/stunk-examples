import { useState } from "react";
import { useChunk } from "stunk/react";
import { X, CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";

import { notificationsChunk, removeNotification } from "@/store/noti-store";
import { getAlertClass } from "@/utils";

export default function Notifications() {
  const [notifications] = useChunk(notificationsChunk);
  const [fadingOut, setFadingOut] = useState<Record<string, boolean>>({});

  const handleRemove = (id: string) => {
    setFadingOut((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => removeNotification(id), 300);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 flex-shrink-0" />;
      case "info":
        return <Info className="w-5 h-5 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 flex-shrink-0" />;
      case "error":
        return <XCircle className="w-5 h-5 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 flex-shrink-0" />;
    }
  };

  return (
    <div className="toast toast-top toast-end z-50">
      {notifications.map((notif) => {
        const alertClass = getAlertClass(notif.type, notif.variant);
        return (
          <div
            className={`alert shadow-lg min-w-[300px] max-w-md transition-opacity duration-300 flex items-center justify-between ${
              fadingOut[notif.id] ? "animate-fadeOut" : "animate-fadeIn"
            } ${alertClass}`}
            key={notif.id}
            role="alert"
          >
            <div className="flex items-center gap-3">
              {getIcon(notif.type)}
              <span className="font-medium break-words">{notif.message}</span>
            </div>
            <button
              onClick={() => handleRemove(notif.id)}
              className="btn btn-ghost btn-sm btn-square ml-2"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
