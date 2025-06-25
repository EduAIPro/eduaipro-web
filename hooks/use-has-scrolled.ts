import { useEffect, useState } from "react";

export function useHasScrolled(threshold: number = 0): {
  hasScrolled: boolean;
} {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setHasScrolled(window.scrollY > threshold);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check on mount
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { hasScrolled };
}
