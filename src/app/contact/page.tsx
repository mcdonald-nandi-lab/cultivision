import ContactForm from "@/components/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Cultivated Meat TEA",
  description:
    "Get in touch with the McDonald-Nandi Lab for inquiries about cultivated meat technology and research.",
  keywords: [
    "contact",
    "cultivated meat",
    "research",
    "McDonald-Nandi Lab",
    "UC Davis",
  ],
};

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Generate Link - Test
            </h1>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Gain access to the Cultivision app
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <ContactForm />
            </div>

            <div className='lg:col-span-1'>
              <div className='bg-white p-6 rounded-lg shadow-lg h-fit'>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                  Contact Information
                </h3>

                <div className='space-y-4'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-blue-600 mt-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        Address
                      </p>
                      <p className='text-sm text-gray-600'>
                        McDonald-Nandi Lab
                        <br />
                        University of California, Davis
                        <br />
                        Davis, CA 95616
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-blue-600 mt-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        Website
                      </p>
                      <a
                        href='https://mcdonald-nandi.ech.ucdavis.edu'
                        className='text-sm text-blue-600 hover:text-blue-800'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        mcdonald-nandi.ech.ucdavis.edu
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-blue-600 mt-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        Response Time
                      </p>
                      <p className='text-sm text-gray-600'>
                        We typically respond within 1-2 business days
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <p className='text-xs text-gray-500'>
                    By submitting this form, you agree to our terms and
                    conditions. Your information will be used solely for
                    responding to your inquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
