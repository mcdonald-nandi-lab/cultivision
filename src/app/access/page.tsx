"use client";
import AccessForm from "@/components/access-form";
import { useAccessControl } from "@/context/access-control";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface StepsProps {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const STEPS: StepsProps[] = [
  {
    number: "1",
    title: "Fill Details",
    description: "Provide your professional information",
    icon: (
      <svg
        className='w-4 h-4 text-green-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Submit Request",
    description: "Send your access request instantly",
    icon: (
      <svg
        className='w-4 h-4 text-green-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Get Access",
    description: "Receive personalized link in email inbox",
    icon: (
      <svg
        className='w-4 h-4 text-green-500'
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
        `relative flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 border`,
        {
          "border-green-400 bg-green-50 shadow-md": isActive,
          "border-gray-200 bg-white/80 hover:border-green-300 hover:bg-green-50/50":
            !isActive,
        }
      )}
    >
      <div
        className={cn(
          `relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300`,
          { "bg-green-500 scale-110": isActive },
          { "bg-gray-400": !isActive }
        )}
      >
        {number}
        {isActive && (
          <div className='absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-75' />
        )}
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center space-x-2'>
          <h3
            className={cn("text-sm font-semibold", {
              "text-green-700": isActive,
              "text-gray-700": !isActive,
            })}
          >
            {title}
          </h3>
          <div className='transition-all duration-300'>{icon}</div>
        </div>
        <p className='text-xs text-gray-600 mt-1'>{description}</p>
      </div>
      {isActive && (
        <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
          <svg
            className='w-2 h-2 text-white'
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
    <main className='min-h-screen pt-30 pb-8 px-4'>
      <div className='container mx-auto max-w-5xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl text-gray-800 font-bold mb-3 tracking-tight'>
            Welcome to <span className='text-green-700'>CultiVision</span>
          </h1>
          <p className='text-lg text-gray-600 max-w-xl mx-auto'>
            Your gateway to Cultivated Meat Analytics
          </p>
        </div>
        <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20'>
          <div className='p-6 md:p-8'>
            <div className='text-center mb-8 lg:hidden'>
              <h2 className='text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center space-x-2'>
                <span className='text-2xl'>🔒</span>
                <span>Secure Access Process</span>
              </h2>
              <p className='text-gray-600 text-sm'>
                Get your personalized access link in three simple steps
              </p>
            </div>
            <div className='lg:hidden'>
              <div className='relative mb-6'>
                <div className='h-1 bg-gray-200 rounded-full'>
                  <div
                    className='h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out'
                    style={{
                      width: `${((activeStep + 1) / STEPS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4 mb-8'>
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

              <div>
                <div className='bg-gray-200 rounded-2xl p-4 text-gray-800 text-center mb-1'>
                  <h3 className='text-xl font-semibold'>
                    Access Link Form
                  </h3>
                </div>
                <div className='bg-gray-50/50 rounded-2xl p-6'>
                  <AccessForm />
                </div>
              </div>
            </div>
            <div className='hidden lg:grid lg:grid-cols-5 lg:gap-8'>
              <div className='lg:col-span-2'>
                <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 h-full'>
                  <div className='text-center mb-8'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center space-x-2'>
                      <span className='text-2xl'>🔒</span>
                      <span>Secure Access Process</span>
                    </h2>
                    <p className='text-gray-600 text-sm'>
                      Get your personalized access link in three simple steps
                    </p>
                  </div>
                  <div className='relative mb-6'>
                    <div className='h-1 bg-gray-200 rounded-full'>
                      <div
                        className='h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out'
                        style={{
                          width: `${((activeStep + 1) / STEPS.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className='space-y-4'>
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
              </div>
              <div className='lg:col-span-3'>
                <div className='bg-gray-100 rounded-2xl p-4 text-gray-800 text-center mb-1'>
                  <h3 className='text-xl font-semibold'>
                    Access Link Form
                  </h3>
                </div>
                <div className='bg-gray-50/50 rounded-2xl p-6'>
                  <AccessForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Access;
