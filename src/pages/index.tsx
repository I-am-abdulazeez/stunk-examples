import AppLink from "@/components/app-links";
import {
  Zap,
  Box,
  Palette,
  Lock,
  ShoppingCart,
  Users,
  FileText,
  Bell,
  Layers,
  Layout,
  Database,
  InfinityIcon,
  MapIcon,
} from "lucide-react";

export default function Index() {
  const examples = [
    { to: "/counter", text: "Counter", icon: Zap },
    { to: "/todo", text: "Task Manager", icon: FileText },
    { to: "/theme-switch", text: "Theme Switch", icon: Palette },
    { to: "/auth-manager", text: "Auth Manager", icon: Lock },
    { to: "/cart", text: "Shopping Cart", icon: ShoppingCart },
    { to: "/users", text: "Fetch Users", icon: Users },
    { to: "/form-manager", text: "Form Manager", icon: FileText },
    { to: "/notify", text: "Notification", icon: Bell },
    { to: "/multi-step", text: "Multi Step Wizard", icon: Layers },
    { to: "/kanban", text: "Kanban Board", icon: Layout },
    { to: "/modal", text: "Modals", icon: Box },
    { to: "/users-paginated", text: "Paginated Users", icon: Database },
    { to: "/users-infinite", text: "Infinite Scroll", icon: InfinityIcon },
    {
      to: "/country-state-picker",
      text: "Country State Picker",
      icon: MapIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center max-w-5xl">
          <div>
            <div className="badge badge-primary badge-lg mb-4 bg-[#2af4c2] text-neutral-800 border-none">
              Stunk v2.7.1 + React 19
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Vite + React + Stunk
            </h1>
            <p className="text-xl md:text-2xl text-base-content/70 mb-8">
              Explore powerful state management patterns with interactive
              examples
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="badge badge-lg border-[#2af4c2]/20">
                ⚡ Lightning Fast
              </div>
              <div className="badge badge-lg border-[#2af4c2]/20">
                🎨 Beautiful UI
              </div>
              <div className="badge badge-lg border-[#2af4c2]/20">
                🚀 Production Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {examples.length} Interactive Examples
          </h2>
          <p className="text-lg text-base-content/70">
            Click any card to explore the example
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {examples.map((example, index) => (
            <AppLink key={example.to} {...example} index={index} />
          ))}
        </div>
      </div>

      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <p className="text-sm opacity-70">
            Built with ❤️ using Vite, React, Tailwind CSS, DaisyUI, and Stunk.
          </p>
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Stunk Examples .
          </p>
        </div>
      </footer>
    </div>
  );
}
