"use client";

import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden py-12 px-2'>
      <div className='max-w-4xl mx-auto px-4 text-center relative z-10'>
        <div className='fade-up-animate'>
          <div className='relative mb-8'>
            <h1 className='text-9xl md:text-[12rem] font-extrabold text-gray-200 select-none'>
              404
            </h1>

            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='relative'>
                <div className='w-8 h-8 bg-green-500 rounded-full animate-pulse absolute -top-16 -left-12 opacity-60' />
                <div className='w-6 h-6 bg-blue-500 rounded-full animate-bounce absolute -top-8 right-16 opacity-40' />
                <div className='w-4 h-4 bg-purple-500 rounded-full animate-ping absolute bottom-12 -left-8 opacity-50' />
              </div>
            </div>
          </div>

          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Our App Can&apos;t
            <span className='bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent'>
              {" "}
              Cultivate
            </span>{" "}
            This Page
          </h2>

          <div>
            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
              Looks like this page doesn&apos;t exist in our cultivated meat
              analytics app. Let&apos;s get you back to exploring the future of
              food production!
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              href='/'
              className='group inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'
            >
              <svg
                className='w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              <span>Back to Home</span>
            </Link>

            <Link
              href='/dashboard'
              className='group inline-flex items-center space-x-3 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'
            >
              <svg
                className='w-5 h-5 transition-transform duration-300 group-hover:scale-110'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
              <span>Go to Dashboard</span>
            </Link>
          </div>

          <div className='mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100'>
            <div className='flex items-center justify-center mb-4'>
              <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                  />
                </svg>
              </div>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Did You Know?
            </h3>
            <p className='text-gray-600'>
              The first lab-grown burger cost $330,000 to produce in 2013. Today, costs have dropped by over 99%! That&apos;s the incredible potential we&apos;re analyzing here.
            </p>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-100/50 to-transparent' />
    </div>
  );
};

export default NotFoundPage;
