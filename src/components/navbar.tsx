"use client";

import { useCalculations } from "@/context/calculation-context";
import { bioreactors } from "@/lib/bioreactors";
import { exportToCsv } from "@/lib/csv-export";
import { createShareableUrl } from "@/lib/url-params";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./icon";
import { LAB_EXT_LINK } from "@/lib/constants";
import { topRightCornerArrowLogo } from "@/lib/icons";
import cn from "classnames";


const URL_COPIED_EVENT = "urlCopied";

const Navbar = () => {
  const { activeReactorId, setActiveReactorId, expenses, costs } =
    useCalculations();
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const handleSelect = (id: string) => {
    setActiveReactorId(id);
    setIsOpen(false);
  };

  const handleDownloadCsv = () => {
    if (expenses && activeReactor) {
      exportToCsv(expenses, activeReactor);
    }
  };

  const handleSaveSettings = async () => {
    const shareableUrl = createShareableUrl(costs, activeReactorId);

    try {
      await navigator.clipboard.writeText(shareableUrl);
      setIsCopied(true);
      window.dispatchEvent(new Event(URL_COPIED_EVENT));
    } catch (err) {
      console.error("Failed to copy URL: ", err);
      const textarea = document.createElement("textarea");
      textarea.value = shareableUrl;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        document.execCommand("copy");
        setIsCopied(true);
        window.dispatchEvent(new Event(URL_COPIED_EVENT));
      } catch (err) {
        console.error("Fallback: Failed to copy URL: ", err);
        alert("Please copy this URL manually: " + shareableUrl);
      }

      document.body.removeChild(textarea);
    }
  };

  return (
    <nav className='bg-white shadow-md px-4 py-3 mb-6 rounded-b-3xl fixed top-0 w-full z-50'>
      <div className='container mx-auto grid grid-cols-3'>
        <Link
          href='/'
          className='flex items-center justify-start gap-x-1 w-full'
        >
          <Image
            src={`${
              process.env.NEXT_PUBLIC_BASE_PATH ?? ""
            }/images/cv-logo.png`}
            alt='Cultivision Logo'
            width={40}
            height={40}
            priority
            className=' object-contain'
          />
          <div className='flex flex-col items-start justify-center w-full'>
            <div className='text-xl font-semibold text-slate-700'>
              CultiVision
            </div>
            <div className='text-xs font-medium italic'>
              Cultivated Meat Dashboard
            </div>
          </div>
        </Link>

        <div
          className='relative flex items-center justify-center'
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='cursor-pointer flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-600 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800'
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
            <div className='absolute top-10 right-20 mt-2 py-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
              {bioreactors.map((reactor) => (
                <button
                  key={reactor.id}
                  onClick={() => handleSelect(reactor.id)}
                  className={`block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer ${
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

        <div className='flex items-center justify-end gap-x-2'>
          <button
            onClick={handleSaveSettings}
            className={cn(
              "flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-2 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 cursor-pointer"
            )}
          >
            {isCopied ? (
              <>
                <svg
                  className='h-4 w-4 text-green-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span className='text-green-600'>URL Copied!</span>
              </>
            ) : (
              <>
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
                    d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                  />
                </svg>
                Save Inputs
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCsv}
            disabled={!expenses}
            className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-2 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 cursor-pointer'
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

          <Link
            href={LAB_EXT_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-2 text-sm transition-all hover:shadow-md text-slate-600 hover:bg-green-50 hover:border-green-500'
          >
            <Icon
              path={topRightCornerArrowLogo.path}
              viewBox={topRightCornerArrowLogo.viewBox}
              fill='#475569'
            />
            Our Lab
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
