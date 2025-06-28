import React from "react";

const OopsIcon = ({ size = 120, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 120 120'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle
        cx='60'
        cy='60'
        r='55'
        fill='#E8F5E5'
        stroke='#3F6E33'
        strokeWidth='2'
        strokeDasharray='5 5'
        className='animate-pulse'
      />
      <g className='animate-bounce' style={{ animationDuration: "2s" }}>
        <path
          d='M25 50 Q20 50 20 55 Q20 60 25 60 L35 60 Q40 60 40 55 Q40 50 35 50 Z'
          fill='none'
          stroke='#2D5226'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M35 55 L45 55'
          stroke='#2D5226'
          strokeWidth='3'
          strokeLinecap='round'
          strokeDasharray='2 2'
          opacity='0.5'
        />

        <path
          d='M85 50 Q90 50 90 55 Q90 60 85 60 L75 60 Q70 60 70 55 Q70 50 75 50 Z'
          fill='none'
          stroke='#2D5226'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M75 55 L65 55'
          stroke='#2D5226'
          strokeWidth='3'
          strokeLinecap='round'
          strokeDasharray='2 2'
          opacity='0.5'
        />
      </g>
      <g>
        <circle cx='45' cy='65' r='3' fill='#1F3A19' />
        <circle cx='75' cy='65' r='3' fill='#1F3A19' />
        <ellipse
          cx='60'
          cy='80'
          rx='8'
          ry='10'
          fill='#1F3A19'
          className='animate-pulse'
          style={{ animationDuration: "1.5s" }}
        />
      </g>
      <g
        className='animate-bounce'
        style={{ animationDelay: "0.5s", animationDuration: "2s" }}
      >
        <text x='15' y='30' fontSize='16' fill='#3F6E33' fontWeight='bold'>
          !
        </text>
        <text x='95' y='30' fontSize='16' fill='#3F6E33' fontWeight='bold'>
          !
        </text>
      </g>
    </svg>
  );
};

// Example usage in your Access component
const Access = () => {
  return (
    <main className='min-h-screen min-w-screen flex flex-col items-center justify-center'>
      <div>
        <div className='flex flex-col items-center justify-center gap-8 p-4 text-center'>
          <OopsIcon size={120} />
          <div className='text-6xl text-gray-700 font-bold'>OOPS!</div>
          <div className='text-xl text-gray-700'>
            It looks like your Cultivision access link is no longer valid.
          </div>
          <div className='text-gray-700'>
            Please click below to complete the contact form and get a new link.
          </div>
          <a
            href='#'
            rel='noreferrer nofollow'
            className='flex items-center space-x-1 md:space-x-2 border-2 border-gray-500 rounded-md px-2 md:px-4 py-2 text-sm transition-all text-slate-600 hover:border-green-500'
          >
            Get New Link
          </a>
        </div>
      </div>
    </main>
  );
};

export default Access;
