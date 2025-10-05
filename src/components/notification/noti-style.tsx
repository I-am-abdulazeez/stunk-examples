import { addNotification } from "@/store/noti-store";
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";
import { getButtonClass, NotiVariant } from "@/utils";

export default function NotiStyle({
  header,
  variant,
}: {
  header: string;
  variant: NotiVariant;
}) {
  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="badge badge-lg bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30">
            {header}
          </div>
          <span>Notification</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => addNotification("Success!", "success", variant)}
            className={`${getButtonClass(
              "success",
              variant
            )} gap-2 justify-start`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Show Success</span>
          </button>

          <button
            onClick={() =>
              addNotification("New update available.", "info", variant)
            }
            className={`${getButtonClass("info", variant)} gap-2 justify-start`}
          >
            <Info className="w-5 h-5" />
            <span>Show Info</span>
          </button>

          <button
            onClick={() =>
              addNotification("Maximum Upload!", "warning", variant)
            }
            className={`${getButtonClass(
              "warning",
              variant
            )} gap-2 justify-start`}
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Show Warning</span>
          </button>

          <button
            onClick={() =>
              addNotification("Something went wrong!", "error", variant)
            }
            className={`${getButtonClass(
              "error",
              variant
            )} gap-2 justify-start`}
          >
            <XCircle className="w-5 h-5" />
            <span>Show Error</span>
          </button>
        </div>

        {/* Preview info */}
        <div className="alert mt-4">
          <Info className="w-4 h-4 text-[#2af4c2] flex-shrink-0" />
          <div className="text-sm">
            <span className="font-semibold">Style: {header}</span>
            <span className="opacity-70 ml-2">
              Click any button to preview this notification variant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
