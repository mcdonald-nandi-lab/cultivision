"use client"

import React, { useEffect, useRef, ReactNode } from "react";
import cn from "classnames";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  movement?: string;
}

const Container = ({
  children,
  className = "",
  movement = "fade-down",
}: ContainerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!movement || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [movement]);

  return (
    <div className={cn(`${movement || ""} ${className}`)} ref={containerRef}>
      {children}
    </div>
  );
};

export default Container;
