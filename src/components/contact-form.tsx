"use client";

import { useToast } from "@/context/toast-context";
import { TERMS_LINK } from "@/lib/constants";
import cn from "classnames";
import React, { FormEvent, useState } from "react";

const ContactForm = () => {
  const { activateToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    useCase: "",
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const affiliation = formData.affiliation.trim();
    const useCase = formData.useCase.trim();
    const termsAccepted = formData.termsAccepted;

    if (!name) {
      activateToast("Please enter your name", "error");
      return;
    }

    if (!email) {
      activateToast("Please enter your email address", "error");
      return;
    }

    const cleanEmail = email.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      activateToast("Please enter a valid email address", "error");
      return;
    }

    if (!affiliation) {
      activateToast("Please enter your affiliation", "error");
      return;
    }

    const useCaseLength = useCase.length;
    if (useCaseLength > 0 && useCaseLength < 20) {
      activateToast(
        "Use case must be at least 20 characters long",
        "error"
      );
      return;
    }

    if (useCaseLength > 500) {
      activateToast("Use case must be less than 500 characters", "error");
      return;
    }

    if (!termsAccepted) {
      activateToast("Please agree to the terms and conditions", "error");
      return;
    }
  
    setIsSubmitting(true);

    try {

      const requestData = {
        name: name,
        email: cleanEmail,
        affiliation: affiliation,
        use_case:
          useCase ??
          "Access request for Cultivision dashboard - submitted via contact form",
        terms_accepted: termsAccepted,
      };

      const response = await fetch(
        "https://mcdonald-nandi.ech.ucdavis.edu/wp-json/cultivision/v1/submit-access-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        activateToast("Access request submitted successfully", "success");
        setFormData({
          name: "",
          email: "",
          affiliation: "",
          useCase: "",
          termsAccepted: false,
        });
      } else {
        activateToast(result.message, "error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      activateToast(
        "Network error. Please check your connection and try again.",
        "error"
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
    formData.useCase &&
    formData.termsAccepted;

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
            className={cn(
              "flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1"
            )}
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
            className={cn(
              "flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1"
            )}
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
          className={cn(
            "flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1"
          )}
          placeholder='University, Company, or Organization'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Use Case <span className='text-red-500'>*</span>
        </label>
        <textarea
          name='useCase'
          value={formData.useCase}
          onChange={handleInputChange}
          rows={4}
          required
          className={
            "flex-grow w-full rounded-md border border-gray-400 px-4 py-1.5 text-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:ring-1 resize-none"
          }
          placeholder='Brief description of your research interest...'
        />
      </div>
      <div className='flex items-start space-x-3'>
        <input
          type='checkbox'
          name='termsAccepted'
          checked={formData.termsAccepted}
          onChange={handleInputChange}
          required
          className='mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
        />
        <span className='text-red-500'>*</span>
        <label className='text-sm text-gray-600 leading-relaxed'>
          I agree to the{" "}
          <a
            href={TERMS_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='underline text-green-800'
          >
            Terms and Conditions
          </a>
          .
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

export default ContactForm;