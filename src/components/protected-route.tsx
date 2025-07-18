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
}: ProtectedRouteProps) {
  const { isValidAccess, isLoading } =
    useAccessControl();
  console.log(isValidAccess, 'HELO')
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isValidAccess) {
      router.push("/access");
    }
  }, [isValidAccess, isLoading, router]);

  if (isLoading) return <Loading />;

  if (!isValidAccess) return fallback || null;

  return (
    <>
      {children}
    </>
  );
}
