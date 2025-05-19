"use client";

import { PRIVACY_POL_LINK, TERMS_LINK } from "@/lib/constants";
import Link from "next/link";
import Container from "../container";
import { useCookieConsent } from "@/context/cookie-consent-context";

const CookieConsent = () => {
  const { showConsentBanner, handleAccept, handleReject } = useCookieConsent();

  return (
    <>
      {showConsentBanner && (
        <Container
          movement='fade-up'
          className='fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:bottom-10 md:-translate-x-0 min-w-sm max-w-md bg-white rounded-md shadow-lg p-4 z-50 border-2 border-gray-700'
        >
          <div className='flex gap-x-1'>
            <svg
              className='w-5 h-5 mr-2 text-gray-600 flex-shrink-0 mt-0.5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.7a1.004 1.004 0 0 0-1.445-1.118c-.489.26-.915.599-1.199 1.01C14.113 7.086 13.557 7 13 7c-1.654 0-3-1.346-3-3 0-.732.271-1.409.732-1.943a1.001 1.001 0 0 0-.101-1.332.995.995 0 0 0-1.302-.06 4.978 4.978 0 0 0-2.329 4.221c0 .287.027.573.067.855a6.453 6.453 0 0 0-4.847 3.291 6.521 6.521 0 0 0-.037 6.344 6.476 6.476 0 0 0 5.622 3.624c.667 0 1.325-.123 1.947-.33a8.491 8.491 0 0 0 6.026 2.485c1.923 0 3.8-.65 5.33-1.896a8.874 8.874 0 0 0 3.892-7.195 8.1 8.1 0 0 0-3.002-6zm-9.784.333a1 1 0 1 1 1.418-1.418 1 1 0 0 1-1.418 1.418zm4 2a1 1 0 1 1 1.414-1.418 1 1 0 0 1-1.414 1.418zm2-4a1 1 0 1 1 1.415-1.418 1 1 0 0 1-1.415 1.418zm-8 6a1 1 0 1 1 1.414-1.414 1 1 0 0 1-1.414 1.414z' />
            </svg>
            <div className='font-semibold text-gray-700 text-md'>
              Cookie Consent Notice
            </div>
          </div>
          <div className='text-gray-500 text-sm mt-2'>
            <span className='underline'>
              We do not share or sell any data to third parties or use it to
              track individual users
            </span>
            . This website uses cookies and google analytics to improve user
            experience, collecting <u>anonymous</u> data on page views and
            interactions. You can checkout our{" "}
            <Link
              href={PRIVACY_POL_LINK}
              target='_blank'
              rel='noreferrer nofollow'
              aria-label='Link to checkout the privacy policy'
              className='hover:underline text-green-500'
            >
              privacy policy
            </Link>{" "}
            <span>and the </span>
            <Link
              href={TERMS_LINK}
              target='_blank'
              rel='noreferrer nofollow'
              aria-label='Link to checkout the privacy policy'
              className='hover:underline text-green-500'
            >
              terms of use
            </Link>{" "}
            for more information.
          </div>
          <div className='flex items-center justify-center mt-4 gap-4'>
            <button
              onClick={handleReject}
              className='bg-transparent border-2 border-solid border-gray-400 text-gray-400 text-sm py-1 px-2 rounded-md cursor-pointer hover:border-red-400 hover:text-red-400'
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className='bg-transparent border-2 border-solid border-gray-400 text-gray-400 text-sm py-1 px-2 rounded-md cursor-pointer hover:border-green-500 hover:text-green-500'
            >
              Accept
            </button>
          </div>
        </Container>
      )}
    </>
  );
};

export default CookieConsent;
