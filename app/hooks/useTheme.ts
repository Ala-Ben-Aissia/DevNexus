import { useContext } from "react";
import { ThemeContext, type Theme } from "~/contexts/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return safe defaults during SSR or if provider is missing
    if (typeof window === "undefined") {
      return {
        theme: "dark" as Theme,
        toggleTheme: () => {},
        setTheme: () => {},
      };
    }
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
