import { LAB_EXT_LINK, LICENSE_LINK, PRIVACY_POL_LINK, UCD_EXT_LINK } from '@/lib/constants';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <div className='grid grid-cols-2 gap-8 items-center'>
        <div className='flex flex-col gap-2'>
          <Link href={UCD_EXT_LINK} target='_blank' rel='noreferrer nofollow'>
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH ?? ""
              }/images/uc-davis-logo.svg`}
              alt='UC Davis Logo'
              width={80}
              height={80}
              priority
              className='pb-1 object-contain'
            />
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <Link
            href={LAB_EXT_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm font-semibold hover:text-green-500 text-slate-600'
          >
            Mcdonald/Nandi Lab
          </Link>
          <Link
            href={LAB_EXT_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm hover:text-green-500 text-slate-600'
          >
            Contact Us
          </Link>
          <Link
            href={PRIVACY_POL_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm hover:text-green-500 text-slate-600'
          >
            Privacy Policy
          </Link>
          <Link
            href={LICENSE_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm hover:text-green-500 text-slate-600'
          >
            License
          </Link>
        </div>
      </div>
      <div className='text-xs text-gray-300 sm:text-center px-4'>
        © 2025{" "}
        <Link href={UCD_EXT_LINK} className='hover:underline'>
          The Regents of the University of California
        </Link>
        .<div>All Rights Reserved.</div>
      </div>
    </div>
  );
}

export default Footer