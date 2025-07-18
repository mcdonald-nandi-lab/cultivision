import { trackButtonClick } from '@/lib/analytics';
import { LAB_EXT_LINK, PRIVACY_POL_LINK, TERMS_LINK, UCD_EXT_LINK } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export const trackFooterLinkClick = (linkName: string) => {
  trackButtonClick("footer_link", linkName);
};

const Footer = () => {
  return (
    <footer className='flex flex-col gap-6 w-full' role='contentinfo'>
      <div className='grid grid-cols-2 gap-8 items-start'>
        <div className='flex flex-col gap-2'>
          <Link
            href={UCD_EXT_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            onClick={() => trackFooterLinkClick("UC Davis")}
          >
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH ?? ""
              }/images/uc-davis-logo.svg`}
              alt='UC Davis Logo'
              width={80}
              height={80}
              priority
              className='pb-1 object-contain'
              aria-label='Visit UC Davis website'
            />
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <Link
            href={LAB_EXT_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm font-semibold hover:text-green-500 text-slate-600 break-normal'
            aria-label='Visit Mcdonald/Nandi Lab website'
            onClick={() => trackFooterLinkClick("Mcdonald/Nandi Lab")}
          >
            McDonald-Nandi Lab
          </Link>
          <Link
            href={LAB_EXT_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm hover:text-green-500 text-slate-600'
            aria-label='Contact Us'
            onClick={() => trackFooterLinkClick("Contact Us")}
          >
            Contact Us
          </Link>
          <Link
            href={TERMS_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm hover:text-green-500 text-slate-600'
            aria-label='Privacy Policy'
            onClick={() => trackFooterLinkClick("Terms of Use")}
          >
            Terms of Use
          </Link>
          <Link
            href={PRIVACY_POL_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm hover:text-green-500 text-slate-600'
            aria-label='Privacy Policy'
            onClick={() => trackFooterLinkClick("Privacy Policy")}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div
        className='text-xs text-gray-400 text-center px-2 md:px-4'
        aria-describedby='info'
        aria-label='Copyright of the The Regents of the University of California'
      >
        © 2025{" "}
        <Link href={UCD_EXT_LINK} className='hover:underline'>
          The Regents of the University of California
        </Link>
        .<div>All Rights Reserved.</div>
      </div>
    </footer>
  );
}

export default Footer