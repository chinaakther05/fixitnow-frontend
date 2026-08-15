"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shrink-0" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-10 px-3 flex items-center justify-center gap-1 rounded-md border border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs shrink-0 cursor-pointer shadow-sm z-50"
      aria-label="Toggle Theme"
    >
     
      <span>{theme === "dark" ? "☀️ Light" : "🌙 Dark"}</span>
    </button>
  );
}