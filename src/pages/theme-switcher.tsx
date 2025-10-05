import { useEffect } from "react";
import { useChunk } from "stunk/react";
import { Sun, Moon, Sparkles, Palette } from "lucide-react";

import GoBack from "@/components/shared/go-back";
import { themeChunk } from "@/store/theme-store";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useChunk(themeChunk);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="card bg-base-200 border border-base-300 overflow-hidden">
          {/* Decorative Header */}
          <div className="relative h-32 bg-gradient-to-br from-[#2af4c2]/20 via-base-300 to-base-200 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-16 h-16 rounded-full bg-[#2af4c2] blur-2xl"></div>
              <div className="absolute bottom-4 right-12 w-20 h-20 rounded-full bg-[#2af4c2] blur-3xl"></div>
            </div>
            <Palette className="w-12 h-12 text-[#2af4c2] relative z-10" />
          </div>

          <div className="card-body p-8 md:p-12">
            {/* Title Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className={`p-3 rounded-2xl transition-all duration-500 ${
                    isLight
                      ? "bg-warning/20 scale-100"
                      : "bg-warning/10 scale-90"
                  }`}
                >
                  <Sun
                    className={`w-8 h-8 transition-colors ${
                      isLight ? "text-warning" : "text-warning/40"
                    }`}
                  />
                </div>

                <div
                  className={`p-3 rounded-2xl transition-all duration-500 ${
                    !isLight ? "bg-info/20 scale-100" : "bg-info/10 scale-90"
                  }`}
                >
                  <Moon
                    className={`w-8 h-8 transition-colors ${
                      !isLight ? "text-info" : "text-info/40"
                    }`}
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-2">
                {isLight ? "Light Mode" : "Dark Mode"}
              </h1>
              <p className="text-base-content/60">
                Choose your preferred visual experience
              </p>
            </div>

            {/* Toggle Section */}
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="toggle toggle-lg toggle-success"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <Sparkles className="w-5 h-5 text-[#2af4c2] animate-pulse" />
                </div>
              </div>

              <div className="text-sm text-base-content/50 font-medium">
                Tap to switch theme
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div
                className={`card bg-base-100 border-2 transition-all duration-300 ${
                  isLight ? "border-[#2af4c2]" : "border-base-300"
                }`}
              >
                <div className="card-body p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Sun className="w-5 h-5 text-warning" />
                    <h3 className="font-bold">Light Theme</h3>
                  </div>
                  <p className="text-sm opacity-70 text-left">
                    Clean and bright interface perfect for daytime use
                  </p>
                  {isLight && (
                    <div className="badge badge-sm bg-[#2af4c2] text-neutral-900 border-none mt-2">
                      Active
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`card bg-base-100 border-2 transition-all duration-300 ${
                  !isLight ? "border-[#2af4c2]" : "border-base-300"
                }`}
              >
                <div className="card-body p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Moon className="w-5 h-5 text-info" />
                    <h3 className="font-bold">Dark Theme</h3>
                  </div>
                  <p className="text-sm opacity-70 text-left">
                    Easy on the eyes for extended sessions and nighttime
                  </p>
                  {!isLight && (
                    <div className="badge badge-sm bg-[#2af4c2] text-neutral-900 border-none mt-2">
                      Active
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats stats-vertical md:stats-horizontal w-full">
              <div className="stat place-items-center">
                <div className="stat-title">Current Theme</div>
                <div className="stat-value text-2xl text-[#2af4c2]">
                  {isLight ? "Light" : "Dark"}
                </div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Auto Save</div>
                <div className="stat-value text-2xl">✓</div>
                <div className="stat-desc">Preferences saved</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">System Sync</div>
                <div className="stat-value text-2xl">
                  <span className="loading loading-spinner loading-sm"></span>
                </div>
                <div className="stat-desc">Ready</div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="alert mt-6">
              <Sparkles className="w-5 h-5 text-[#2af4c2] flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">Theme Persistence</p>
                <p className="opacity-70">
                  Your theme preference is automatically saved and will be
                  applied across all sessions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <GoBack />
        </div>
      </div>
    </div>
  );
}
