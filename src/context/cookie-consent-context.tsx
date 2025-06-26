"use client";

import { trackUserBehavior } from "@/lib/analytics";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CookieConsentContextType {
  cookieConsent: boolean | null;
  setCookieConsent: (consent: boolean) => void;
  showConsentBanner: boolean;
  setShowConsentBanner: (show: boolean) => void;
  handleAccept: () => void;
  isConsentProcessed: boolean;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [showConsentBanner, setShowConsentBanner] = useState<boolean>(false);
  const [isConsentProcessed, setIsConsentProcessed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedConsent = localStorage.getItem("cookieConsent");

      if (!storedConsent) {
        setShowConsentBanner(true);
        setCookieConsent(null);
      } else {
        setCookieConsent(true);
        setShowConsentBanner(false);
      }

      setIsConsentProcessed(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setCookieConsent(true);
    setShowConsentBanner(false);
    trackUserBehavior("cookie_consent_accepted");
  };

  return (
    <CookieConsentContext.Provider
      value={{
        cookieConsent,
        setCookieConsent,
        showConsentBanner,
        setShowConsentBanner,
        handleAccept,
        isConsentProcessed,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context)
    throw new Error(
      "useCookieConsent must be used inside CookieConsentProvider"
    );
  return context;
}
