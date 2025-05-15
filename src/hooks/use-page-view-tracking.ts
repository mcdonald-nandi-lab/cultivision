import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export function usePageViewTracking() {
  const pathname = usePathname();

  useEffect(() => {
    const pageTitle = document.title;

    trackPageView(pathname, pageTitle);
  }, [pathname]);
}
