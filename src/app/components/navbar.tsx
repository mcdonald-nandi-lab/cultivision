"use client";

import { useCalculations } from "@/context/calculation-context";
import { bioreactors } from "@/lib/bioreactors";
import { exportToCsv } from "@/lib/csv-export";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export default function Navbar() {
  const { activeReactorId, setActiveReactorId, expenses } = useCalculations();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeReactor = bioreactors.find((r) => r.id === activeReactorId);

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

  const handleSelect = (id: string) => {
    setActiveReactorId(id);
    setIsOpen(false);
  };

  const handleDownloadCsv = () => {
    if (expenses && activeReactor) {
      exportToCsv(expenses, activeReactor);
    }
  };

  return (
    <nav className='bg-white shadow-md px-4 py-4 mb-6 rounded-b-3xl fixed top-0 w-full z-50'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link href='/' className='flex items-center justify-center gap-x-2'>
          <Image
            src='/images/cvLogo.png'
            alt='Cultivision Logo'
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
            priority
            className='pb-1'
          />
          <div className='text-xl font-semibold text-slate-700'>
            CultiVision
          </div>
        </Link>

        <div className='relative' ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='cursor-pointer flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-600 text-sm transition-all hover:shadow-lg text-slate-700 hover:bg-gray-100 hover:border-slate-800'
          >
            <span className='font-semibold'>Bioreactor:</span>
            <span className='font-medium text-green-700'>
              {activeReactor?.name || "Select"}
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
                  onClick={() => handleSelect(reactor.id)}
                  className={`block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm ${
                    activeReactorId === reactor.id
                      ? "bg-blue-50 font-medium"
                      : ""
                  }`}
                >
                  {reactor.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='flex items-center gap-x-3'>
          <button
            onClick={handleDownloadCsv}
            disabled={!expenses}
            className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-4 text-sm transition-all hover:shadow-lg text-slate-700 hover:bg-gray-100 hover:border-slate-800'
          >
            <svg
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            Download CSV
          </button>

          {/* <Link
            href={LAB_EXT_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-4 text-sm transition-all hover:shadow-lg text-slate-600 hover:bg-gray-100 hover:border-slate-800'
          >
            <Icon
              path={topRightCornerArrowLogo.path}
              viewBox={topRightCornerArrowLogo.viewBox}
              fill='#475569'
            />
            Mcdonald/Nandi Lab
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
