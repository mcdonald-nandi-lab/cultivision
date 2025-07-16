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
    <div className={cn(`bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 ${className}`)}>
      {children}
    </div>
  );
};

export default Container;
