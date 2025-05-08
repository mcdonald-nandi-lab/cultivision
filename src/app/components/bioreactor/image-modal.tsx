"use client";

import { useEffect, useRef } from "react";
import { getBioreactorById } from "@/lib/bioreactors";
import Image from "next/image";

interface ImageModalProps {
  bioreactorId: string;
  onClose: () => void;
}

export default function ImageModal({ bioreactorId, onClose }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const bioreactor = getBioreactorById(bioreactorId);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    // Prevent scrolling on body
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!bioreactor) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
      <div
        ref={modalRef}
        className='relative bg-white rounded-lg max-w-4xl w-11/12 h-5/6 flex flex-col'
      >
        <div className='p-4 border-b flex justify-between items-center'>
          <h3 className='text-xl font-semibold text-slate-700'>
            {bioreactor.name} - Flow Diagram
          </h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div className='flex-1 relative overflow-hidden p-4'>
          <Image
            src={bioreactor.image}
            alt={`${bioreactor.name} Flow Diagram`}
            fill
            style={{ objectFit: "contain" }}
            priority
            className='p-4'
          />
        </div>

        <div className='p-4 border-t'>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div className='flex flex-col'>
              <span className='font-medium text-slate-600'>
                Annual Production:
              </span>
              <span>{bioreactor.annualProduction.toLocaleString()} kg/yr</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-medium text-slate-600'>Media Volume:</span>
              <span>{(bioreactor.mediaVolume / 1000000).toFixed(1)}M L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
