"use client";

import { bioreactors } from "@/lib/bioreactors";

interface NavbarProps {
  activeReactorId: string;
  onReactorChange: (reactorId: string) => void;
}

export default function Navbar({
  activeReactorId,
  onReactorChange,
}: NavbarProps) {
  return (
    <nav className='bg-white shadow-md px-4 py-3 mb-6 fixed top-0 z-50 w-full'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='text-xl font-semibold text-gray-800'>
          Cultivated Meat Dashboard
        </div>
        <div className='flex space-x-6'>
          {bioreactors.map((reactor) => (
            <button
              key={reactor.id}
              onClick={() => onReactorChange(reactor.id)}
              className={`px-3 py-2 rounded transition-colors ${
                activeReactorId === reactor.id
                  ? "font-bold text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
              }`}
            >
              {reactor.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
