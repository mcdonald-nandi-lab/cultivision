"use client";

import { useCalculations } from "@/context/calculation-context";
import { trackDownload, trackUserBehavior } from "@/lib/analytics";
import { LAB_EXT_LINK } from "@/lib/constants";
import { exportToCsv } from "@/lib/csv-export";
import { houseLogo, topRightCornerArrowLogo } from "@/lib/icons";
import { createShareableUrl } from "@/lib/url-params";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./icon";
import { useModal } from "@/context/modal-context";
import { useAccessControl } from "@/context/access-control-context";
import { useToast } from "@/context/toast-context";
import { BIOREACTORS } from "@/lib/data";

const URL_COPIED_EVENT = "urlCopied";

const Navbar = () => {
  const pathname = usePathname();
  const { isValidAccess } = useAccessControl();
  const { openModal } = useModal();
  const { activeReactorId, expenses, costs, doublingTime, density } =
    useCalculations();
  const { activateToast } = useToast();
  const [includeTokenInShare, setIncludeTokenInShare] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const {tokenInfo} = useAccessControl();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  const activeReactor = BIOREACTORS.find((r) => r.id === activeReactorId);

  const isHome = pathname === "/";
  const isAccessPage = pathname === "/access";

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

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const handleDownloadCsv = () => {
    if (expenses && activeReactor) {
      exportToCsv(expenses, activeReactor);
      trackDownload("csv", `${activeReactor.name}-expenses.csv`);
    }
    setIsOptionsOpen(false);
  };

  const handleDiagramClick = () => {
    openModal();
    setIsOptionsOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    trackUserBehavior("toggle_sidebar", { opened: !isSidebarOpen });
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
    trackUserBehavior("toggle_options", { opened: !isOptionsOpen });
  };

  const getDisplayText = () => {
    if (!activeReactor) return "Select";
    let text = activeReactor.name;
    if (doublingTime) {
      text += ` • ${doublingTime.replace("h", "")}h`;
    }
    if (density) {
      text += ` • ${density.replace("gpl", "")} g/L`;
    }
    return text;
  };

  const handleSaveSettings = () => {
    setShowShareModal(true);
    setIsOptionsOpen(false);
  };

  const handleShareConfirm = async () => {
    const shareableUrl = createShareableUrl(
      costs,
      activeReactorId,
      doublingTime,
      density,
      includeTokenInShare
    );

    try {
      await navigator.clipboard.writeText(shareableUrl);
      setIsCopied(true);
      window.dispatchEvent(new Event(URL_COPIED_EVENT));
      trackUserBehavior("save_settings", {
        reactor_id: activeReactorId,
        doubling_time: doublingTime,
        density: density,
        included_token: includeTokenInShare,
        success: true,
      });

      setShowShareModal(false);
      setIncludeTokenInShare(false);
      activateToast("Input URL copied to clipboard!", "success");

      setTimeout(() => setIsCopied(false), 4000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
      // Fallback for browsers that don't support clipboard API
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
        trackUserBehavior("save_settings", {
          reactor_id: activeReactorId,
          doubling_time: doublingTime,
          density: density,
          included_token: includeTokenInShare,
          success: true,
        });
        setShowShareModal(false);
        setIncludeTokenInShare(false);
        activateToast("Input URL copied to clipboard!", "success");
      } catch (err) {
        console.error("Fallback: Failed to copy URL: ", err);
        alert("Please copy this URL manually: " + shareableUrl);
        activateToast("Failed to copy URL", "error");
      }

      document.body.removeChild(textarea);

    }
  };

  return (
    <>
      <nav
        className='bg-white shadow-md py-3 mb-6 rounded-b-3xl fixed top-0 w-full z-40'
        role='navigation'
        aria-label='Main Navigation'
      >
        <div className='container mx-auto flex items-center justify-between px-4'>
          <Link
            href={isValidAccess ? "/" : ""}
            className='flex items-center justify-start gap-x-1'
          >
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
            <div
              className={cn(
                "flex flex-col items-start justify-center sm:flex",
                { hidden: isHome }
              )}
            >
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

          {isHome && isValidAccess && (
            <div className='relative dropdown-container'>
              <button
                className='dropdown-button flex items-center space-x-1 md:space-x-2 bg-white border border-gray-300 rounded-md px-2 md:px-4 py-2 text-sm transition-all text-slate-700'
                aria-controls='reactor-configuration'
                aria-haspopup='listbox'
              >
                <span className='font-semibold hidden sm:inline'>
                  Configuration:
                </span>
                <span className='font-medium text-green-700 text-xs sm:text-sm'>
                  {getDisplayText()}
                </span>
              </button>
            </div>
          )}

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
              className={cn("hidden xl:flex items-center gap-4", {
                "gap-8": !isHome,
              })}
            >
              {isHome && isValidAccess && (
                <div className='relative options-dropdown'>
                  <button
                    onClick={toggleOptions}
                    className='options-button flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 cursor-pointer'
                    aria-expanded={isOptionsOpen}
                    aria-controls='options-dropdown'
                    aria-haspopup='menu'
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
                        d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    <span>Options</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 ease-in-out",
                        {
                          "rotate-180": isOptionsOpen,
                        }
                      )}
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
                  <div
                    className={cn(
                      `absolute top-full right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-all duration-200 ease-in-out flex flex-col gap-y-1`,
                      {
                        "opacity-100 visible translate-y-0": isOptionsOpen,
                      },
                      { "opacity-0 invisible -translate-y-2": !isOptionsOpen }
                    )}
                    id='options-dropdown'
                    role='menu'
                  >
                    <button
                      onClick={handleDiagramClick}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'
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
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                      View Diagram
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'
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
                          <span>Share Link</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleDownloadCsv}
                      disabled={!expenses}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
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
                  </div>
                </div>
              )}
              {!isHome && !isAccessPage && (
                <Link
                  href={"/"}
                  className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-2 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800'
                >
                  <Icon
                    path={houseLogo.path}
                    viewBox={houseLogo.viewBox}
                    fill='#475569'
                  />
                  <span>Home</span>
                </Link>
              )}
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
            className={cn("flex flex-col space-y-8", { "space-y-4": isHome })}
          >
            {isHome && !isAccessPage && (
              <button
                className={cn(
                  "flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-2 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 cursor-pointer"
                )}
                onClick={openModal}
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
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
                Diagram
              </button>
            )}
            {isHome && (
              <button
                onClick={handleSaveSettings}
                className={cn(
                  "flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 cursor-pointer w-full justify-start"
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
                    <span>Share Link</span>
                  </>
                )}
              </button>
            )}
            {isHome && (
              <button
                onClick={handleDownloadCsv}
                disabled={!expenses}
                className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 cursor-pointer w-full justify-start disabled:opacity-50 disabled:cursor-not-allowed'
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
                <span>Download CSV</span>
              </button>
            )}
            {!isHome && !isAccessPage && (
              <Link
                href={"/"}
                className='flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-2 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800'
              >
                <Icon
                  path={houseLogo.path}
                  viewBox={houseLogo.viewBox}
                  fill='#475569'
                />
                <span>Home</span>
              </Link>
            )}
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
      {showShareModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-title'
        >
          <div className='bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4'>
            <h2 className='text-xl font-bold mb-4'>
              Share Dashboard Configuration
            </h2>

            <div className='mb-6'>
              <p className='text-sm text-gray-600 mb-3'>
                Share your current calculation settings with others.
              </p>

              {tokenInfo && (
                <div className='bg-gray-50 p-3 rounded-md mb-3'>
                  <label className='flex items-start cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={includeTokenInShare}
                      onChange={(e) => setIncludeTokenInShare(e.target.checked)}
                      className='mt-1 mr-3'
                    />
                    <div className='flex-1'>
                      <span className='font-medium'>Include access token</span>
                      <p className='text-xs text-gray-500 mt-1'>
                        Recipients won&apos;t need to request their own access
                      </p>
                      {tokenInfo.ismaster ? (
                        <p className='text-xs mt-1 text-blue-600'>
                          Master token (never expires)
                        </p>
                      ) : (
                        <p className='text-xs mt-1 text-green-600'>
                          Token expires in{" "}
                          {Math.floor(
                            (tokenInfo.expires - Date.now()) / (1000 * 60 * 60)
                          )}
                          h
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {includeTokenInShare && (
                <div className='bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm'>
                  <p className='text-yellow-800'>
                    <strong>⚠️ Security Notice:</strong> Anyone with this link
                    will have access to the dashboard
                    {tokenInfo &&
                      !tokenInfo.ismaster &&
                      " until the token expires"}
                    .
                  </p>
                </div>
              )}
            </div>

            <div className='flex justify-center gap-4'>
              <button
                onClick={handleShareConfirm}
                className='text-gray-700 px-4 py-1 bg-white rounded-md border-1 border-gray-700 hover:border-green-500 hover:text-green-500 font-medium cursor-pointer'
              >
                Copy Share Link
              </button>

              <button
                onClick={() => {
                  setShowShareModal(false);
                  setIncludeTokenInShare(false);
                }}
                className='px-4 py-1 bg-white text-gray-700 border-1 border-gray-700 rounded-md hover:border-red-500 hover:text-red-500 cursor-pointer'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
