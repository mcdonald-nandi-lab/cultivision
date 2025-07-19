'use client'
import React, { ReactNode, useEffect, useState } from "react";
import { useAccessControl } from "@/context/access-control-context";
import { CULTIVISION_LAB_PAGE } from "@/lib/constants";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Link from "next/link";

interface stepsProps {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}


const STEPS: stepsProps[] = [
  {
    number: "1",
    title: "Click Below",
    description:
      "Visit our lab website to get started with your access request",
    icon: (
      <svg
        className='w-5 h-5 text-green-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Complete Form",
    description: "Fill out our access request form with your professional details",
    icon: (
      <svg
        className='w-5 h-5 text-green-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Receive Link",
    description:
      "Get your personalized access link instantly delivered to your email",
    icon: (
      <svg
        className='w-5 h-5 text-green-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        />
      </svg>
    ),
  },
];

const ProcessStep = ({
  number,
  title,
  description,
  icon,
  isActive = false,
}: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  isActive: boolean;
}) => {
  return (
    <div
      className={cn(
        `relative flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 border-2 cursor-pointer group`,
        {
          "border-green-500 bg-green-50 shadow-lg transform -translate-y-1":
            isActive,
        },
        {
          "border-gray-200 bg-white hover:border-green-300 hover:shadow-md hover:-translate-y-0.5":
            !isActive,
        }
      )}
    >
      <div
        className={`absolute inset-0 rounded-xl bg-green-100 opacity-0 transition-opacity duration-300`}
      />

      <div
        className={cn(
          `relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all duration-300 transform`,
          { "bg-green-500 scale-110 animate-pulse": isActive },
          {
            "bg-gray-400 group-hover:bg-green-400 group-hover:scale-105":
              !isActive,
          }
        )}
      >
        {number}

        <div
          className={cn(
            `absolute inset-0 rounded-full border-2 border-green-500 transition-all duration-500`,
            { "animate-ping opacity-75": isActive },
            { "opacity-0": !isActive }
          )}
        />
      </div>

      <div className='relative z-10 flex-1'>
        <div className='flex items-center space-x-2 mb-2'>
          <h3
            className={cn(
              `font-semibold transition-colors duration-300`,
              { "text-green-700": isActive },
              { "text-gray-700 group-hover:text-green-600": !isActive }
            )}
          >
            {title}
          </h3>

          <div className={`transition-all duration-300 transform`}>{icon}</div>
        </div>

        <p className='text-sm text-gray-600 leading-relaxed'>{description}</p>
      </div>

      {isActive && (
        <div className='absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce'>
          <svg
            className='w-3 h-3 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
      )}
    </div>
  );
};

const Access = () => {
    const { isValidAccess } = useAccessControl();
    const router = useRouter();

    useEffect(() => {
      if (isValidAccess) {
        router.push("/");
      }
    }, [isValidAccess, router]);

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveStep((prev: number) => (prev + 1) % STEPS.length);
      }, 2500);
      return () => clearInterval(interval);
    }, []);

  return (
    <main className='min-h-screen flex items-center justify-center p-4 pt-28'>
      <div className='w-full max-w-5xl'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl md:text-6xl text-gray-800 font-bold mb-6 tracking-tight'>
            Welcome to <span className='text-green-700'>CultiVision</span>
          </h1>

          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
            Your gateway to Cultivated Meat Analytics
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8'>
          <div className='text-center mb-10'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center space-x-2'>
              <span className='text-3xl'>🔐</span>
              <span>Secure Access Required</span>
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              To maintain security and ensure optimal performance, CultiVision
              requires a personalized access link.
            </p>
          </div>

          <div className='relative'>
            <div className='hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200'>
              <div
                className='h-full bg-green-500 transition-all duration-1000 ease-in-out'
                style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>

            <div className='grid md:grid-cols-3 gap-6 relative'>
              {STEPS.map((step, index) => (
                <ProcessStep
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isActive={index === activeStep}
                />
              ))}
            </div>
          </div>

          <div className='text-center mt-10'>
            <Link
              href={CULTIVISION_LAB_PAGE}
              className='group relative inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg overflow-hidden'
            >
              <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full' />

              <span className='relative z-10'>Request Access Link</span>
              <svg
                className='relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
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
            </Link>

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
