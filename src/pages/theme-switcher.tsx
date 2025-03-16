import { useEffect } from "react";

import { useChunk } from "stunk/react";

import { themeChunk } from "@/store/theme-store";
import GoBack from "@/components/shared/go-back";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useChunk(themeChunk);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col items-center gap-5">
      <span className="text-6xl font-bold">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="toggle toggle-xl"
      />

      <GoBack />
    </div>
  );
}
