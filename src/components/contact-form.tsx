"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  affiliation: string;
  message: string;
  acknowledgement: boolean;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    affiliation: "",
    message: "",
    acknowledgement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic client-side validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.affiliation.trim()
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.acknowledgement) {
      setSubmitStatus({
        type: "error",
        message: "Please acknowledge the terms and conditions.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        // Reset form
        setFormData({
          name: "",
          email: "",
          affiliation: "",
          message: "",
          acknowledgement: false,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
        Cultivated Meat TEA
      </h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Your Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
            placeholder='Enter your full name'
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Your Email <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
            placeholder='Enter your email address'
          />
        </div>

        <div>
          <label
            htmlFor='affiliation'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Affiliation <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='affiliation'
            name='affiliation'
            value={formData.affiliation}
            onChange={handleChange}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
            placeholder='Enter your organization or affiliation'
          />
        </div>

        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Your Message
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical'
            placeholder='Enter your message (optional)'
          />
        </div>

        <div className='flex items-start space-x-3'>
          <input
            type='checkbox'
            id='acknowledgement'
            name='acknowledgement'
            checked={formData.acknowledgement}
            onChange={handleChange}
            required
            className='mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <label
            htmlFor='acknowledgement'
            className='text-sm text-gray-700 leading-5'
          >
            <span className='text-red-500'>*</span> I AGREE TO THE TERMS AND
            CONDITIONS
          </label>
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium'
        >
          {isSubmitting ? (
            <div className='flex items-center justify-center'>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Sending...
            </div>
          ) : (
            "Send Message"
          )}
        </button>

        {submitStatus && (
          <div
            className={`p-4 rounded-md border ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
            role='alert'
          >
            <div className='flex'>
              <div className='flex-shrink-0'>
                {submitStatus.type === "success" ? (
                  <svg
                    className='h-5 w-5 text-green-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-5 w-5 text-red-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium'>{submitStatus.message}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
