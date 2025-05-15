import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export function usePageViewTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageTitle = document.title;

    trackPageView(pathname, pageTitle);
  }, [pathname, searchParams]);
}
