"use client"

import cn from "classnames";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({
  children,
  className = "",
}: ContainerProps) => {
  return (
    <div className={cn(`bg-white rounded-4xl shadow-sm py-4 px-6 border-gray-100 ${className}`)}>
      {children}
    </div>
  );
};

export default Container;
