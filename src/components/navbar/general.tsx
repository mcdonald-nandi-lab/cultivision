"use client";

import { trackUserBehavior } from "@/lib/analytics";
import { LAB_EXT_LINK } from "@/lib/constants";
import { houseLogo, topRightCornerArrowLogo } from "@/lib/icons";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../icon";


const GeneralNavbar = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (!target) return;

      if (!target.closest(".sidebar") && !target.closest(".hamburger-button")) {
        setIsSidebarOpen(false);
      }

      if (
        !target.closest(".options-dropdown") &&
        !target.closest(".options-button")
      ) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    trackUserBehavior("toggle_sidebar", { opened: !isSidebarOpen });
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
    trackUserBehavior("toggle_options", { opened: !isOptionsOpen });
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
              width={35}
              height={35}
              priority
              className='object-contain'
            />
            <div className='flex flex-col items-start justify-center hidden sm:inline'>
              <div className='text-[21px] font-semibold text-slate-700 mb-[-0.2em]'>
                CultiVision
              </div>
              <div className='text-[9px] font-medium'>
                Cultivated Meat Dashboard
              </div>
            </div>
          </Link>
          <div className='flex items-center justify-around gap-4'>
            <button
              onClick={toggleSidebar}
              className='hamburger-button block xl:hidden md:p-2 focus:outline-none cursor-pointer'
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
            <div
              className={cn("hidden xl:flex items-center gap-8")}
            >
              <Link
                  href={"/"}
                  className='flex items-center gap-x-2 rounded-md border border-slate-300 py-[0.5em] px-2 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800'
                >
                  <Icon
                    path={houseLogo.path}
                    viewBox={houseLogo.viewBox}
                    fill='#475569'
                    height={"1em"}
                  />
                  <span className='mt-[0.1em]'>Home</span>
                </Link>
              <Link
                href={LAB_EXT_LINK}
                target='_blank'
                rel='noreferrer nofollow'
                className='flex items-center gap-x-2 rounded-md border border-slate-300 py-[0.5em] px-2 text-sm transition-all hover:shadow-md text-slate-600 hover:bg-green-50 hover:border-green-500'
              >
                <Icon
                  path={topRightCornerArrowLogo.path}
                  viewBox={topRightCornerArrowLogo.viewBox}
                  fill='#475569'
                  height='1em'
                />
                <span>Our Lab</span>
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

          <div
            className={cn("flex flex-col space-y-4")}
          >
              <Link
                href={"/"}
                className='flex items-center gap-x-2 rounded-md border border-slate-300 py-[0.5em] px-2 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800'
              >
                <Icon
                  path={houseLogo.path}
                  viewBox={houseLogo.viewBox}
                  fill='#475569'
                  height={"1em"}
                />
                <span className='mt-[0.1em]'>Home</span>
              </Link>
            <Link
              href={LAB_EXT_LINK}
              target='_blank'
              rel='noreferrer nofollow'
              className='flex items-center gap-x-2 rounded-md border border-slate-300 py-[0.5em] px-3 text-sm transition-all hover:shadow-md text-slate-600 hover:bg-green-50 hover:border-green-500 w-full justify-start'
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon
                path={topRightCornerArrowLogo.path}
                viewBox={topRightCornerArrowLogo.viewBox}
                fill='#475569'
                height='1em'
              />
              <span>Our Lab</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralNavbar;
