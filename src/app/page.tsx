"use client";

import HomeNavbar from "@/components/home-navbar";
import {
  LAB_EXT_LINK,
  PRIVACY_POL_LINK,
  STATS,
  TERMS_LINK,
  UCD_EXT_LINK,
} from "@/lib/constants";
import { trackFooterLinkClick } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface featureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FEATURES: featureProps[] = [
  {
    icon: (
      <svg
        className='w-6 h-6 rounded-lg'
        fill='none'
        stroke='white'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
    ),
    title: "Cost Analysis",
    description:
      "Comprehensive breakdown of production costs including COGS, labor, materials, and facility expenses with real-time calculations.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6 rounded-lg'
        fill='none'
        stroke='white'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'
        />
      </svg>
    ),
    title: "Interactive Visualizations",
    description:
      "Dynamic charts and graphs showing cost distribution, labor analysis, and production metrics with export capabilities.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6 rounded-lg'
        fill='none'
        stroke='white'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
        />
      </svg>
    ),
    title: "Bioreactor Configurations",
    description:
      "Compare different bioreactor types and configurations with detailed flow diagrams and performance metrics.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6 rounded-lg'
        fill='none'
        stroke='white'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
        />
      </svg>
    ),
    title: "Customizable Parameters",
    description:
      "Adjust production parameters including media costs, labor rates, utilities, and doubling times for scenario analysis.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6 rounded-lg'
        fill='none'
        stroke='white'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
        />
      </svg>
    ),
    title: "Shareable Analysis",
    description:
      "Save and share your analysis configurations via URL parameters. Export data and visualizations for presentations.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6 rounded-lg'
        fill='none'
        stroke='white'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        />
      </svg>
    ),
    title: "Research-Grade Data",
    description:
      "Built on validated research from UC Davis McDonald-Nandi Lab with peer-reviewed methodologies and industry standards.",
  },
];

const LandingPage = () => {
  return (
    <div className='bg-white'>
      <HomeNavbar />
      <section
        className='relative pt-32 md:pt-48 pb-30 flex items-center overflow-hidden'
        style={{
          backgroundImage:
            "linear-gradient(to left bottom, #c6f6c3, #caf6cc, #d0f6d4, #d6f6db, #dcf6e2, #e0f7e7, #e4f7ec, #e9f8f0, #edf9f4, #f0fbf7, #f5fcfa, #f9fdfc)",
        }}
      >
        <div className='max-w-7xl mx-auto w-full relative z-10'>
          <div className='text-center px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto mb-16'>
              <h1 className='text-6xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-8xl'>
                <span className='block'>Cultivated Meat</span>
                <span className='block text-brand'>Analytics</span>
              </h1>
              <p className='mt-6 text-lg text-gray-500 px-2 md:text-xl max-w-2xl mx-auto'>
                Interactive dashboard for analyzing cultivated meat production
                costs, bioreactor performance, and sustainability metrics.
              </p>
              <div className='mt-8 flex flex-col sm:flex-row sm:justify-center gap-4 items-center'>
                <div className='rounded-md shadow w-48 md:w-64'>
                  <Link
                    href='/dashboard'
                    className='w-full flex items-center justify-center px-4 md:px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-brand hover:bg-[#357026] transition-colors'
                  >
                    Launch Dashboard
                  </Link>
                </div>
                <div className='w-48 md:w-64'>
                  <button
                    onClick={() => {
                      const element = document.getElementById("features");
                      if (element)
                        element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className='w-full flex items-center justify-center px-8 py-4 border border-brand text-base font-medium rounded-md text-brand bg-white hover:bg-gray-50 transition-colors cursor-pointer'
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className='max-w-5xl mx-auto mt-4 p-4'>
              <div className='bg-white rounded-xl shadow-2xl overflow-hidden'>
                <div className='bg-gray-800 px-4 py-3 flex items-center'>
                  <div className='flex space-x-2'>
                    <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                    <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                  </div>
                  <div className='ml-4 text-gray-300 text-sm'>
                    cultivision.dashboard
                  </div>
                </div>
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_BASE_PATH ?? ""
                  }/images/dashboard-preview.png`}
                  alt='CultiVision Dashboard Preview'
                  width={1200}
                  height={800}
                  className='w-full h-auto object-contain'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='relative bg-[#C6F6C3] overflow-hidden rounded-b-4xl shadow-lg'>
        <div className='max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-extrabold text-gray-800 sm:text-4xl'>
              Comprehensive Production Analysis
            </h2>
            <p className='mt-4 text-xl text-slate-700'>
              Everything you need to understand cultivated meat economics
            </p>
          </div>
          <dl className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {STATS.map((stat, index) => (
              <div key={index} className='text-center'>
                <dd className='order-1 text-2xl lg:text-5xl font-extrabold text-gray-800'>
                  {stat.value}
                </dd>
                <dt className='order-2 mt-2 text-lg leading-6 font-medium text-slate-700'>
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id='features' className='relative py-20 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center'>
            <h2 className='text-base text-brand font-semibold tracking-wide uppercase'>
              Features
            </h2>
            <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Powerful Analytics for Cultivated Meat
            </p>
            <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
              Comprehensive tools for analyzing production costs, comparing
              bioreactor configurations, and understanding the economics of
              cellular agriculture.
            </p>
          </div>

          <div className='mt-20'>
            <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
              {FEATURES.map((feature, index) => (
                <div
                  key={index}
                  className='text-center rounded-xl p-4 bg-white'
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-brand mx-auto mb-6'>
                    {feature.icon}
                  </div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-base text-gray-500 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id='about'
        className='relative py-4 bg-[#C6F6C3] overflow-hidden rounded-4xl shadow-lg'
      >
        <div className='w-full mx-auto p-8 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center'>
          <div className='lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center max-w-5xl'>
            <div>
              <h2 className='text-3xl font-extrabold text-gray-800 sm:text-4xl text-center md:text-left'>
                Research-Grade Insights
              </h2>
              <p className='mt-4 text-lg text-slate-700 text-center md:text-left'>
                CultiVision is developed by the McDonald-Nandi Lab at UC Davis,
                bringing together cutting-edge research in cellular agriculture
                with practical industry applications.
              </p>
              <div className='mt-8 space-y-6'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <div className='flex items-center justify-center h-8 w-8 rounded-md bg-brand text-white'>
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-lg font-bold text-gray-800'>
                      Validated Methodologies
                    </h3>
                    <p className='mt-2 text-base text-slate-700'>
                      Based on peer-reviewed research and industry-standard
                      calculations for accurate cost modeling.
                    </p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <div className='flex items-center justify-center h-8 w-8 rounded-md bg-brand text-white'>
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-lg font-bold text-gray-800'>
                      Industry Applications
                    </h3>
                    <p className='mt-2 text-base text-slate-700'>
                      Used by researchers, investors, and industry professionals
                      for strategic decision-making.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-12 lg:mt-0'>
              <div className='bg-white rounded-xl shadow-lg p-8 text-center'>
                <div className='text-6xl mb-4'>🧬</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  UC Davis McDonald-Nandi Lab
                </h3>
                <p className='text-gray-600 mb-6'>
                  Leading research in cellular agriculture and sustainable food
                  production technologies.
                </p>
                <a
                  href='https://mcdonald-nandi.ech.ucdavis.edu/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-brand hover:text-[#357026] font-medium transition-colors'
                >
                  Visit Lab Website
                  <svg
                    className='ml-2 w-4 h-4'
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='relative overflow-hidden p-4 mt-16'>
        <div className='max-w-4xl mx-auto text-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8 relative z-10'>
          <h2 className='text-3xl font-extrabold text-gray-800 sm:text-4xl'>
            Ready to analyze your production costs?
          </h2>
          <p className='mt-4 text-lg leading-6 text-gray-700'>
            Start exploring the economics of cultivated meat production with our
            interactive dashboard.
          </p>
          <Link
            href='/dashboard'
            className='mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand hover:bg-gray-50 transition-colors'
          >
            Access Dashboard
          </Link>
        </div>
      </section>

      <div
        className='w-full flex items-center justify-center rounded-3xl bg-white mt-24'
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <footer className='flex flex-col gap-6 w-6xl p-8' role='contentinfo'>
          <div className='grid md:grid-cols-2 gap-8 items-start justify-center w-full'>
            <div className='flex flex-col items-start justify-center gap-8'>
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
                  width={140}
                  height={140}
                  priority
                  className='pb-1 object-contain'
                  aria-label='Visit UC Davis website'
                />
              </Link>
              <Link
                href={LAB_EXT_LINK}
                target='_blank'
                rel='noreferrer nofollow'
                onClick={() => trackFooterLinkClick("UC Davis")}
              >
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_BASE_PATH ?? ""
                  }/images/mnl-logo.png`}
                  alt='UC Davis Logo'
                  width={180}
                  height={180}
                  priority
                  className='pb-1 object-contain'
                  aria-label='Visit UC Davis website'
                />
              </Link>
            </div>
            <div className='flex flex-col gap-2 md:items-end justify-center'>
              <Link
                href={LAB_EXT_LINK}
                target='_blank'
                rel='noreferrer nofollow'
                className='text-md font-semibold hover:text-brand text-slate-600 break-normal'
                aria-label='Visit Mcdonald/Nandi Lab website'
                onClick={() => trackFooterLinkClick("Mcdonald/Nandi Lab")}
              >
                McDonald-Nandi Lab
              </Link>
              <Link
                href={LAB_EXT_LINK}
                target='_blank'
                rel='noreferrer nofollow'
                className='text-md hover:text-brand text-slate-600'
                aria-label='Contact Us'
                onClick={() => trackFooterLinkClick("Contact Us")}
              >
                Contact Us
              </Link>
              <Link
                href={TERMS_LINK}
                target='_blank'
                rel='noreferrer nofollow'
                className='text-md hover:text-brand text-slate-600'
                aria-label='Privacy Policy'
                onClick={() => trackFooterLinkClick("Terms of Use")}
              >
                Terms of Use
              </Link>
              <Link
                href={PRIVACY_POL_LINK}
                target='_blank'
                rel='noreferrer nofollow'
                className='text-md hover:text-brand text-slate-600'
                aria-label='Privacy Policy'
                onClick={() => trackFooterLinkClick("Privacy Policy")}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-2'>
            <div
              className='text-xs text-gray-400 text-center'
              aria-describedby='info'
              aria-label='Copyright of the The Regents of the University of California'
            >
              <span>© 2025 </span>
              <Link href={UCD_EXT_LINK} className='hover:underline'>
                The Regents of the University of California.
              </Link>
              <span> All Rights Reserved.</span>
            </div>
            <div className='text-xs text-gray-500 text-right'>
              Made with ❤️ for sustainable food production.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
