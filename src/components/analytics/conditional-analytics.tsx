"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "@/context/cookie-consent";

export default function ConditionalAnalytics() {
  const { cookieConsent, isConsentProcessed } = useCookieConsent();

  if (isConsentProcessed && cookieConsent) {
    return (
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}
      />
    );
  }

  return null;
}
