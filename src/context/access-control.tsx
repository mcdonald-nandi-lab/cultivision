"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { WORDPRESS_API_URL } from "@/lib/constants";

interface AccessContextType {
  isValidAccess: boolean;
  isLoading: boolean;
  tokenInfo: TokenInfo | null;
  checkAccess: () => void;
  clearAccess: () => void;
}

interface TokenInfo {
  id: string;
  issued: number;
  expires: number;
  version: string;
  ismaster?: boolean;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessControlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const router = useRouter();

  const verifyToken = async (
    token: string
  ): Promise<{ valid: boolean; info?: TokenInfo }> => {
    try {
      const response = await fetch(WORDPRESS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        console.error("API request failed:", response.status);
        return { valid: false };
      }

      const result = await response.json();

      if (result.valid && result.data) {
        return { valid: true, info: result.data };
      } else {
        console.error(
          "Token verification failed:",
          result.error || "Unknown error"
        );
        return { valid: false };
      }
    } catch (error) {
      console.error("Error calling verification API:", error);
      return { valid: false };
    }
  };

  const checkAccess = useCallback(async () => {
    setIsLoading(true);

    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      const { valid, info } = await verifyToken(urlToken);

      if (valid && info) {
        localStorage.setItem("cultivision_access_token", urlToken);
        localStorage.setItem("cultivision_token_info", JSON.stringify(info));

        // Clean URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("token");
        window.history.replaceState({}, "", newUrl.toString());

        setIsValidAccess(true);
        setTokenInfo(info);
        setIsLoading(false);
        return;
      }
    }
    const storedToken = localStorage.getItem("cultivision_access_token");

    if (storedToken) {
      const { valid, info } = await verifyToken(storedToken);

      if (valid && info) {
        setIsValidAccess(true);
        setTokenInfo(info);
      } else {
        localStorage.removeItem("cultivision_access_token");
        localStorage.removeItem("cultivision_token_info");
        setIsValidAccess(false);
        setTokenInfo(null);
      }
    } else {
      setIsValidAccess(false);
      setTokenInfo(null);
    }

    setIsLoading(false);
  }, []);

  const clearAccess = useCallback(() => {
    localStorage.removeItem("cultivision_access_token");
    localStorage.removeItem("cultivision_token_info");
    setIsValidAccess(false);
    setTokenInfo(null);
    router.push("/access");
  }, [router]);

  useEffect(() => {
    if (tokenInfo && !tokenInfo.ismaster) {
      const checkExpiration = setInterval(() => {
        if (Date.now() > tokenInfo.expires) {
          clearAccess();
        }
      }, 3600000); // Check every hour

      return () => clearInterval(checkExpiration);
    }
  }, [clearAccess, tokenInfo]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleUrlChange = () => {
      checkAccess();
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [checkAccess]);

  return (
    <AccessContext.Provider
      value={{
        isValidAccess,
        isLoading,
        tokenInfo,
        checkAccess,
        clearAccess,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
}

export const useAccessControl = () => {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error(
      "useAccessControl must be used within an AccessControlProvider"
    );
  }
  return context;
};
