"use client";

import { useEffect, useRef, useState } from "react";
import { getBioreactorById } from "@/lib/bioreactors";
import cn from "classnames";
import Image from "next/image";

interface ImageModalProps {
  bioreactorId: string;
  onClose: () => void;
}

const ImageModal = ({ bioreactorId, onClose }: ImageModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [isZoomed, setIsZoomed] = useState(false);
  const bioreactor = getBioreactorById(bioreactorId);

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
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!bioreactor) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30'>
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
            className='text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer'
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
          <div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className='w-full h-full relative'
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${
                bioreactor.image
              }`}
              alt={`${bioreactor.name} Flow Diagram`}
              fill
              className={cn(
                "transition-transform duration-200 ease-out scale-100 object-contain",
                { "scale-200 cursor-zoom-in": isZoomed }
              )}
              style={{
                transformOrigin,
              }}
              priority
            />
          </div>
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
              <span>{(bioreactor.mediaVolume / 1_000_000).toFixed(1)}M L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;