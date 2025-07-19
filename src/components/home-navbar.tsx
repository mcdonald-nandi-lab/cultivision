"use client";

import { trackUserBehavior } from "@/lib/analytics";
import { LAB_EXT_LINK } from "@/lib/constants";
import { topRightCornerArrowLogo } from "@/lib/icons";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "./icon";

const HomeNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (!target) return;

      if (!target.closest(".sidebar") && !target.closest(".hamburger-button")) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    trackUserBehavior("toggle_sidebar", { opened: !isSidebarOpen });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav
        className='bg-white shadow-md py-3 mb-6 rounded-b-3xl fixed top-0 w-full z-40'
        role='navigation'
        aria-label='Main Navigation'
      >
        <div className='container mx-auto flex items-center justify-between px-4'>
          <Link href='/' className='flex items-center justify-start gap-x-1'>
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH ?? ""
              }/images/cv-logo.png`}
              alt='Cultivision Logo'
              width={40}
              height={40}
              priority
              className='object-contain'
            />
            <div className='flex flex-col items-start justify-center'>
              <div className='text-xl font-semibold text-slate-700 relative'>
                CultiVision
                <div className='absolute top-0 right-[-27px] text-green-800 rounded-sm text-xs italic'>
                  Beta
                </div>
              </div>
              <div className='text-xs font-medium italic'>
                Cultivated Meat Dashboard
              </div>
            </div>
          </Link>

          <div className='flex items-center justify-around gap-4'>
            <button
              onClick={toggleSidebar}
              className='hamburger-button block lg:hidden md:p-2 focus:outline-none cursor-pointer'
            >
              <svg
                className='w-6 h-6 text-slate-700'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>

            <div className='hidden lg:flex items-center gap-6'>
              <button
                onClick={() => scrollToSection("features")}
                className='text-slate-600 hover:text-slate-900 text-sm font-bold transition-colors cursor-pointer'
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className='text-slate-600 hover:text-slate-900 text-sm font-bold transition-colors cursor-pointer'
              >
                About
              </button>
              <Link
                href='/dashboard'
                className='group inline-flex items-center gap-x-2 rounded-md py-2 px-4 text-sm text-white font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300'
              >
                <div className='relative h-4 w-4'>
                  <svg
                    className='absolute inset-0 h-4 w-4 transition-all duration-300 group-hover:opacity-0 group-hover:scale-75'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                  <svg
                    className='absolute inset-0 h-4 w-4 transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </div>
                <span>Dashboard</span>
              </Link>

              <Link
                href={LAB_EXT_LINK}
                target='_blank'
                rel='noreferrer nofollow'
                className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-600 hover:bg-green-50 hover:border-green-500'
              >
                <Icon
                  path={topRightCornerArrowLogo.path}
                  viewBox={topRightCornerArrowLogo.viewBox}
                  fill='#475569'
                />
                <span>Lab</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          `sidebar fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out`,
          { "translate-x-0": isSidebarOpen },
          { "translate-x-full": !isSidebarOpen }
        )}
        role='complementary'
        aria-label='Sidebar Menu'
      >
        <div className='p-6'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-xl font-semibold text-slate-700'>Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className='text-gray-500 hover:text-gray-700 cursor-pointer'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          <div className='flex flex-col space-y-4'>
            <button
              onClick={() => scrollToSection("features")}
              className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 w-full justify-start cursor-pointer'
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
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
              <span>Features</span>
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 w-full justify-start cursor-pointer'
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
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>About</span>
            </button>

            <Link
              href='/dashboard'
              className='flex items-center gap-x-2 rounded-md py-2 px-4 text-sm text-white font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300'
              onClick={() => setIsSidebarOpen(false)}
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
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
              <span>Launch Dashboard</span>
            </Link>

            <Link
              href={LAB_EXT_LINK}
              target='_blank'
              rel='noreferrer nofollow'
              className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-600 hover:bg-green-50 hover:border-green-500 w-full justify-start'
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon
                path={topRightCornerArrowLogo.path}
                viewBox={topRightCornerArrowLogo.viewBox}
                fill='#475569'
              />
              <span>Our Lab</span>
            </Link>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default HomeNavbar;
