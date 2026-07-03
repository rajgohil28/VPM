"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const set = (next: Theme) => {
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("vpm-theme", next);
    } catch {}
  };

  return (
    <div className="flex items-center rounded-lg border border-line bg-base-800/60 p-0.5">
      {(["light", "dark"] as const).map((t) => (
        <button
          key={t}
          onClick={() => set(t)}
          aria-label={`${t} mode`}
          className={cn(
            "grid h-6 w-7 place-items-center rounded-md transition-colors",
            mounted && theme === t ? "bg-base-700 text-ink" : "text-ink-faint hover:text-ink-muted"
          )}
        >
          <Icon name={t === "light" ? "Sun" : "Moon"} className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
