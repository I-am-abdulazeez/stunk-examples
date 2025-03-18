import { addNotification } from "@/store/noti-store";

import { getButtonClass, NotiVariant } from "@/utils";

export default function NotiStyle({
  header,
  variant,
}: {
  header: string;
  variant: NotiVariant;
}) {
  return (
    <div className="mb-5 px-7 sm:px-0">
      <p className="mb-5 text-left text-md sm:text-xl">{header} Notification</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => addNotification("Success!", "success", variant)}
          className={getButtonClass("success", variant)}
        >
          Show Success
        </button>

        <button
          onClick={() =>
            addNotification("New update available.", "info", variant)
          }
          className={getButtonClass("info", variant)}
        >
          Show Info
        </button>

        <button
          onClick={() => addNotification("Maximum Upload!", "warning", variant)}
          className={getButtonClass("warning", variant)}
        >
          Show Warning
        </button>

        <button
          onClick={() =>
            addNotification("Something went wrong!", "error", variant)
          }
          className={getButtonClass("error", variant)}
        >
          Show Error
        </button>
      </div>
    </div>
  );
}
