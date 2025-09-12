"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useAccessControl } from "@/context/access-control-context";
import { useToast } from "@/context/toast-context";
import { useRouter } from "next/navigation";
import cn from "classnames";
import { TERMS_LINK } from "@/lib/constants";

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

const ContactForm = () => {
  const { activateToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    use_case: "",
    terms_accepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    if (
      !formData.terms_accepted ||
      !formData.name ||
      !formData.email ||
      !formData.affiliation
    )
      return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        activateToast(
          "Access request submitted successfully",
          "success",
        );
        setFormData({
          name: "",
          email: "",
          affiliation: "",
          use_case: "",
          terms_accepted: false,
        });
      } else {
        activateToast(
          result.message,
          "error",
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      activateToast(
        "Network error. Please check your connection and try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.affiliation &&
    formData.use_case &&
    formData.terms_accepted;

  if (submitSuccess) {
    return (
      <div className='text-center py-8'>
        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <svg
            className='w-10 h-10 text-green-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
        <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
          Access Request Submitted!
        </h3>
        <p className='text-gray-600 mb-6 max-w-md mx-auto'>
          Access link has been sent to your inbox!
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className='text-green-600 hover:text-green-700 font-medium transition-colors duration-200'
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
            className={cn("flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1")}
            placeholder='Your full name'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
            className={cn("flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1")}
            placeholder='your.email@domain.com'
          />
        </div>
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Affiliation <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='affiliation'
          value={formData.affiliation}
          onChange={handleInputChange}
          required
          className={cn("flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1")}
          placeholder='University, Company, or Organization'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Use Case <span className='text-red-500'>*</span>
        </label>
        <textarea
          name='use_case'
          value={formData.use_case}
          onChange={handleInputChange}
          rows={4}
          required
          className={"flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1 resize-none"}
          placeholder='Brief description of your research interest...'
        />
      </div>
      <div className='flex items-start space-x-3'>
        <input
          type='checkbox'
          name='terms_accepted'
          checked={formData.terms_accepted}
          onChange={handleInputChange}
          required
          className='mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
        />
        <span className='text-red-500'>*</span>
        <label className='text-sm text-gray-600 leading-relaxed'>
          I agree to the <a href={TERMS_LINK} target="_blank" rel="noreferrer nofollow" className="underline text-green-800">terms and conditions</a>.
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !isFormValid}
        className={cn(
          "w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform",
          {
            "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:-translate-y-1 hover:shadow-lg":
              !isSubmitting && isFormValid,
            "bg-gray-400 cursor-not-allowed": isSubmitting || !isFormValid,
          }
        )}
      >
        {isSubmitting ? (
          <div className='flex items-center justify-center space-x-2'>
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
            <span>Submitting Request...</span>
          </div>
        ) : (
          <div className='flex items-center justify-center space-x-2'>
            <span>Request Access</span>
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
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </div>
        )}
      </button>
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
                <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white text-center mb-1'>
                  <h3 className='text-xl font-semibold'>
                    Request Your Access Link
                  </h3>
                </div>
                <div className='bg-gray-50/50 rounded-2xl p-6'>
                  <ContactForm />
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
                <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white text-center mb-1'>
                  <h3 className='text-xl font-semibold'>
                    Request Your Access Link
                  </h3>
                </div>
                <div className='bg-gray-50/50 rounded-2xl p-6'>
                  <ContactForm />
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
