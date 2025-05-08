"use client";

import { bioreactors } from "@/lib/bioreactors";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  activeReactorId: string;
  onReactorChange: (reactorId: string) => void;
}

export default function Navbar({
  activeReactorId,
  onReactorChange,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeReactor = bioreactors.find(
    (reactor) => reactor.id === activeReactorId
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (reactorId: string) => {
    onReactorChange(reactorId);
    setIsOpen(false);
  };

  return (
    <nav className='bg-white shadow-md px-4 py-4 mb-6'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link href={'/'} className='flex items-center justify-center gap-x-2'>
          <Image
            src={"/images/cvLogo.png"}
            alt={`Cultivision Logo`}
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
            priority
            className='pb-1'
          />
          <div
            className='text-xl font-semibold text-gray-700'
          >
            CultiVision
          </div>
        </Link>
        <div className='relative' ref={dropdownRef}>
          <button
            className='cursor-pointer flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span style={{ color: "var(--foreground)" }}>Bioreactor: </span>
            <span className='font-medium' style={{ color: "#2563eb" }}>
              {activeReactor?.name || "Select a bioreactor"}
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>

          {isOpen && (
            <div className='absolute right-0 mt-2 py-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
              {bioreactors.map((reactor) => (
                <button
                  key={reactor.id}
                  className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${
                    activeReactorId === reactor.id
                      ? "bg-blue-50 font-medium text-blue-600"
                      : ""
                  }`}
                  onClick={() => handleSelect(reactor.id)}
                >
                  {reactor.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}