import { addNotification } from "@/store/noti-store";

export default function NotiStyle({
  header,
  variant,
}: {
  header: string;
  variant: "default" | "soft" | "outline" | "dashed";
}) {
  return (
    <div className="mb-5">
      <p className="mb-5 text-left">{header} Notification</p>
      <div className="flex gap-2">
        <button
          onClick={() => addNotification("Success!", "success", variant)}
          className="btn btn-success"
        >
          Show Success
        </button>
        <button
          onClick={() =>
            addNotification("New update available.", "info", variant)
          }
          className="btn btn-info"
        >
          Show Info
        </button>
        <button
          onClick={() => addNotification("Maximum Upload!", "warning", variant)}
          className="btn btn-warning"
        >
          Show Warning
        </button>
        <button
          onClick={() =>
            addNotification("Something went wrong!", "error", variant)
          }
          className="btn btn-error"
        >
          Show Error
        </button>
      </div>
    </div>
  );
}
