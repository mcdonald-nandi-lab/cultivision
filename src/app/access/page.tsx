'use client'

import { useAccessControl } from "@/context/access-control-context";
import { CULTIVISION_LAB_PAGE } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProcessStep = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div
    className={`flex items-start space-x-4 p-4 rounded-lg transition-all border border-1 border-green-700`}
  >
    <div
      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-green-700`}
    >
      {number}
    </div>
    <div>
      <h3
        className={`font-semibold text-green-700 `}
      >
        {title}
      </h3>
      <p className='text-sm text-gray-600 mt-1'>{description}</p>
    </div>
  </div>
);

const Access = () => {
    const { isValidAccess } = useAccessControl();
    const router = useRouter();

    useEffect(() => {
      if (isValidAccess) {
        router.push("/");
      }
    }, [isValidAccess, router]);

  return (
    <main className='min-h-screen flex items-center justify-center p-4 pt-28'>
      <div className='w-full max-w-4xl'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl md:text-6xl text-gray-800 font-bold mb-6 tracking-tight'>
            Welcome to <span className='text-[#41932B]'>CultiVision</span>
          </h1>

          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
            Your gateway to Cultivated Meat Analytics
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8'>
          <div className='text-center mb-10'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              🔐 Secure Access Required
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              To maintain security and ensure optimal performance, CultiVision
              requires a personalized access link. This system helps us provide
              the best experience for authorized researchers and industry
              professionals.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 mb-10'>
            <ProcessStep
              number='1'
              title='Click Below'
              description='Visit our lab website to get started'
            />
            <ProcessStep
              number='2'
              title='Complete Form'
              description='Fill out our Request Access form with your details'
            />
            <ProcessStep
              number='3'
              title='Receive Link'
              description='Get your secure access link via email'
            />
          </div>

          <div className='text-center'>
            <a
              href={CULTIVISION_LAB_PAGE}
              rel='noreferrer nofollow'
              className='inline-flex items-center space-x-3 bg-white text-green-700 hover:text-white bg-gradient-to-r hover:bg-[#41932B] font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-2 border-green-700 hover:border-[#41932B] transform hover:-translate-y-1 text-lg'
            >
              <span>Request Access Link</span>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </a>

            <p className='text-sm text-gray-500 mt-4'>
              This will open our lab website in a new tab
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Access;
