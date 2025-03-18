import Heading from "@/components/shared/heading";
import NotiStyle from "@/components/notification/noti-style";
import GoBack from "@/components/shared/go-back";

export default function NotifyExample() {
  return (
    <>
      <Heading text="Notification" />
      <NotiStyle header="Default" variant="default" />
      <NotiStyle header="Soft" variant="soft" />
      <NotiStyle header="Outline" variant="outline" />
      <NotiStyle header="Dashed" variant="dash" />
      <GoBack />
    </>
  );
}
