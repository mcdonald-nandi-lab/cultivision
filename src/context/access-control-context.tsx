"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const verifyToken = async (
    token: string
  ): Promise<{ valid: boolean; info?: TokenInfo }> => {
    try {
      console.log("Verifying token with WordPress API...");

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
        console.log("Token verified successfully!");
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

  const checkAccess = async () => {
    setIsLoading(true);

    const urlToken = searchParams.get("token");

    if (urlToken) {
      const { valid, info } = await verifyToken(urlToken);

      if (valid && info) {
        localStorage.setItem("cultivision_access_token", urlToken);
        localStorage.setItem("cultivision_token_info", JSON.stringify(info));

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
  };

  const clearAccess = () => {
    localStorage.removeItem("cultivision_access_token");
    localStorage.removeItem("cultivision_token_info");
    setIsValidAccess(false);
    setTokenInfo(null);
    router.push("/access");
  };

  useEffect(() => {
    if (tokenInfo && !tokenInfo.ismaster) {
      const checkExpiration = setInterval(() => {
        if (Date.now() > tokenInfo.expires) {
          clearAccess();
        }
      }, 3600000); // Check every minute

      return () => clearInterval(checkExpiration);
    }
  }, [tokenInfo]);

  useEffect(() => {
    checkAccess();
  }, [searchParams]);

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