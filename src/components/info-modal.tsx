"use client";

import { ReactNode, useCallback, useEffect } from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const InfoModal = ({ isOpen, onClose, children }: InfoModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 animate-in fade-in duration-200 rounded-lg'
      onClick={handleBackdropClick}
    >
      <div
        className='relative bg-white rounded-lg max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 p-6'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className='w-full flex items-center justify-center mt-6'>
          <button
            onClick={onClose}
            className='px-4 py-1 bg-white text-gray-700 border-1 border-gray-700 rounded-md hover:border-red-500 hover:text-red-500 cursor-pointer'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
