"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Userback from "@userback/widget";
import type { UserbackWidget } from "@userback/widget";

const UserbackContext = createContext<UserbackWidget | null>(null);

const token = process.env.NEXT_PUBLIC_USERBACK_TOKEN!;

export const UserbackProvider = ({ children }: { children: ReactNode }) => {
  const [userback, setUserback] = useState<UserbackWidget | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const instance = await Userback(token, {
          custom_data: {
            page: window.location.pathname,
            app: "cultivision",
            timestamp: new Date().toISOString(),
          },
          autohide: false,
        });

        setUserback(instance);

        setTimeout(() => {
          if (instance && instance.showLauncher) {
            instance.showLauncher();
          }
        }, 1000);
      } catch (error) {
        console.error("Userback initialization failed:", error);
      }
    };

    init();
  }, []);

  return (
    <UserbackContext.Provider value={userback}>
      {children}
    </UserbackContext.Provider>
  );
};

export const useUserback = () => useContext(UserbackContext);
