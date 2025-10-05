import Heading from "@/components/shared/heading";
import NotiStyle from "@/components/notification/noti-style";
import GoBack from "@/components/shared/go-back";
import { Bell } from "lucide-react";

export default function NotifyExample() {
  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <Heading text="Notification" />

        <div className="card bg-base-200 border border-base-300 mb-6">
          <div className="card-body p-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-[#2af4c2]" />
              <h2 className="text-2xl font-bold">Notification Styles</h2>
            </div>
            <p className="opacity-70">
              Choose from different notification variants and test all
              notification types
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <NotiStyle header="Default" variant="default" />
          <NotiStyle header="Soft" variant="soft" />
          <NotiStyle header="Outline" variant="outline" />
          <NotiStyle header="Dashed" variant="dash" />
        </div>

        <div className="mt-6">
          <GoBack />
        </div>
      </div>
    </div>
  );
}
