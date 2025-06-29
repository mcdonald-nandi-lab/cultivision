"use client";

import Loading from "@/app/loading";
import { useAccessControl } from "@/context/access-control-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showStatus?: boolean;
}

export default function ProtectedRoute({
  children,
  fallback,
  showStatus = true,
}: ProtectedRouteProps) {
  const { isValidAccess, isLoading, tokenInfo } =
    useAccessControl();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isValidAccess) {
      router.push("/access");
    }
  }, [isValidAccess, isLoading, router]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (!isValidAccess) {
    return fallback || null;
  }

  return (
    <>
      {showStatus && tokenInfo && tokenInfo.ismaster && (
        <div className='fixed top-20 right-4 bg-white shadow-md rounded-lg p-3 z-50 border border-gray-200'>
          <div className='flex items-center gap-2'>
            <div className={`w-2 h-2 rounded-full bg-blue-500`}></div>
            <span className='text-sm text-gray-600'>God Mode</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
