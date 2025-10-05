import Brands from "@/components/brands";
import AppLink from "@/components/app-links";

export default function Index() {
  return (
    <>
      <Brands />
      <div className="px-10">
        <h1 className="text-2xl md:text-4xl font-bold">Vite + React + Stunk</h1>
        <div>
          <h3 className="text-xl md:text-2xl my-5">
            These examples demonstrates how to use Stunk with React.
          </h3>
        </div>
        <div className="flex items-center gap-4 mt-10 flex-wrap max-w-[500px] mx-auto justify-center">
          <AppLink to="/counter" text="Counter" />
          <AppLink to="/todo" text="Task Manager" />
          <AppLink to="/theme-switch" text="Theme Switch" />
          <AppLink to="/auth-manager" text="Auth Manager" />
          <AppLink to="/cart" text="Shopping Cart" />
          <AppLink to="/users" text="Fetch Users" />
          <AppLink to="/form-manager" text="Form Manager" />
          <AppLink to="/notify" text="Notification" />
          <AppLink to="/multi-step" text="Multi Step Wizard" />
          <AppLink to="/kanban" text="Kanban Board (lg screens only)" />
          <AppLink to="/modal" text="Modals " />
          <AppLink to="/users-paginated" text="Paginated Users" />
          <AppLink to="/users-infinite" text="Infinite Scroll Posts" />
        </div>
        <div className="mt-10 text-sm text-base-content/70">
          Note: These examples are built using Stunk v2.6.0 and React 19.
        </div>
      </div>
    </>
  );
}
