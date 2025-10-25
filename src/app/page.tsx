"use client";

import { trackFooterLinkClick } from "@/components/footer";
import HomeNavbar from "@/components/navbar/landing";
import { InfoModal } from "@/components/info-modal";
import {
  AUTHOR_LINK,
  LAB_EXT_LINK,
  PRIVACY_POL_LINK,
  STATS,
  TERMS_LINK,
  UCD_EXT_LINK,
} from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

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

const Authors = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='text-2xl text-center text-green-700 font-semibold'>
        Authors
      </div>
      <div className='w-full flex flex-col items-start justify-around gap-8'>
        <div className='border-1 border-gray-500 rounded-lg border-solid flex flex-col items-center justify-center p-4 w-full'>
          <div className='text-lg hover:text-green-600 text-slate-700 cursor-pointer font-semibold text-center'>
            Aunsh Bandivadekar
          </div>
          <div className='text-md text-gray-700'>Software Developer</div>
          <Link
            href={AUTHOR_LINK}
            target='_blank'
            rel='noreferrer nofollow'
            className='text-sm hover:text-green-600 text-slate-600 mt-1 cursor-pointer'
            aria-label='Author: Aunsh Bandivadekar'
            onClick={() => trackFooterLinkClick("Author: Aunsh Bandivadekar")}
          >
            {AUTHOR_LINK}
          </Link>
        </div>
        <div className='border-1 border-gray-500 rounded-lg border-solid flex flex-col items-center justify-center p-4 w-full'>
          <div className='text-lg hover:text-green-600 text-slate-700 cursor-pointer font-semibold text-center'>
            Varun Gore
          </div>
          <div className='text-md text-gray-700'>Phd. Candidate</div>
          <div className='text-sm text-slate-600 mt-1'>
            Chemical Engineering
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsAuthorModalOpen(true);
  };

  const closeModal = () => {
    setIsAuthorModalOpen(false);
  };

  return (
    <div className='bg-white'>
      <HomeNavbar />
      <section className="pt-20 md:pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 min-h-screen flex flex-col justify-between rounded-b-3xl shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(52,211,153,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]"></div>

        <div className="flex-grow flex items-center pt-12 md:pt-16 justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  AI-POWERED ANALYTICS
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8">
                  Cultivated Meat <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Analytics</span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Interactive dashboard powered by AI for analyzing cultivated meat production costs, 
                  bioreactor performance, and sustainability metrics. Ask Viz anything about your data.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start max-w-xs sm:max-w-none mx-auto">
                  <Link href="/dashboard" className="sm:w-auto">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/50 cursor-pointer w-full flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Launch Dashboard
                    </button>
                  </Link>
                  <button className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/20 transition cursor-pointer w-full sm:w-auto" onClick={() => {
                      const element = document.getElementById("features");
                      if (element)
                        element.scrollIntoView({ behavior: "smooth" })
                      }}
                  aria-label="Learn more about the app"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              
              <div className="relative mt-10 lg:mt-0">
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/10 transform hover:scale-105 transition-transform duration-500 max-w-2xl mx-auto">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 flex items-center border-b border-white/10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-gray-300 text-sm">cultivision.dashboard</div>
                  </div>
                  <Image
                    src={`${
                      process.env.NEXT_PUBLIC_BASE_PATH ?? ""
                    }/images/dashboard-preview.png`}
                    alt='CultiVision Dashboard Preview'
                    width={1400}
                    height={900}
                    className='w-full h-full object-contain scale-105'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow"></div>
        <div className="mt-16 md:mt-24"></div>

        <div className="w-full overflow-hidden relative mt-auto">
          <div className="w-full overflow-hidden">
            <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite]">
              {[0, 1].map((repeatIdx) => (
                <div key={repeatIdx} className="flex">
                  {STATS.map((stat, index) => (
                    <div key={repeatIdx + '-' + index} className="inline-flex items-baseline px-8">
                      <span className="text-2xl font-bold text-gray-300">{stat.value}</span>
                      <span className="text-sm text-gray-400 ml-2">{stat.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

<section id='features' className='relative py-20 overflow-hidden bg-white'>
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
    <div className='text-center mb-16'>
      <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wide cursor-pointer">
        Features
      </div>
      <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>
        Powerful Analytics for
        <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Cultivated Meat Production
        </span>
      </h2>
      <p className='mt-4 max-w-2xl text-lg text-gray-600 mx-auto'>
        Comprehensive tools for analyzing production costs, comparing
        bioreactor configurations, and understanding the economics of
        cellular agriculture.
      </p>
    </div>

    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {FEATURES.map((feature, index) => (
        <div
          key={index}
          className='group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 hover:border-green-200 cursor-pointer'
        >
          <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-green-50 to-emerald-50 transition-opacity duration-500' />
          
          <div className='relative z-10'>
            <div className='flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-green-500/50 cursor-pointer'>
              {feature.icon}
            </div>

            <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300'>
              {feature.title}
            </h3>
            <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
              {feature.description}
            </p>

            <div className='mt-6 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 w-0 group-hover:w-12' />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


 <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
  </div>
  
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 cursor-pointer">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
        </svg>
        POWERED BY AI
      </div>
      <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
        Meet Viz AI
        <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Your Production Analytics Assistant</span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Ask questions, get insights, and optimize your production costs with intelligent AI assistance
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur-2xl opacity-20"></div>
        
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white">Viz AI</div>
              <div className="text-xs text-emerald-100">Online</div>
            </div>
          </div>
          
          <div className="p-6 space-y-4 h-96 overflow-y-auto">
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                <p className="text-sm">What's affecting my COGS the most?</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-white/90 rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                <p className="text-sm text-gray-800 mb-2">Based on your current configuration:</p>
                <ul className="text-sm text-gray-700 space-y-1 mb-2">
                  <li>• <strong>Media costs:</strong> 53% of OPEX</li>
                  <li>• <strong>Facility costs:</strong> 44% of OPEX</li>
                  <li>• <strong>Labor:</strong> 2% of OPEX</li>
                </ul>
                <p className="text-xs text-gray-600">Try optimizing media costs first for maximum impact.</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                <p className="text-sm">Compare bioreactor types</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-white/90 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
            <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Ask Viz AI anything..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm cursor-text"
                disabled
              />
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition group cursor-pointer">
          <div className="flex items-center justify-center gap-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition cursor-pointer">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Natural Language Queries</h3>
          </div>
          <p className="text-gray-300">Ask questions in plain English about your production data, costs, and configurations</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition cursor-pointer">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Context-Aware Analysis</h3>
          <p className="text-gray-300">Viz AI understands your specific bioreactor setup and provides personalized recommendations</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition cursor-pointer">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Instant Optimization Insights</h3>
          <p className="text-gray-300">Get AI-powered suggestions to reduce costs and improve production efficiency</p>
        </div>
      </div>
    </div>

    <div className="mt-16 text-center">
      <p className="text-gray-400 mb-4 text-sm uppercase tracking-wide">Try asking:</p>
      <div className="flex flex-wrap justify-center gap-3">
        {["How can I reduce my COGS?", "Compare 210kL vs 262kL bioreactors", "What's my labor cost breakdown?", "Optimize my doubling time"].map((question, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-emerald-400/50 transition cursor-pointer">
            "{question}"
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  <section id='about' className='relative py-20 bg-white overflow-hidden'>
  <div className='max-w-7xl mx-auto px-6 relative z-10'>
    <div className='lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center'>
      <div className='text-center lg:text-left'>
        <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide cursor-pointer">
          RESEARCH-GRADE PLATFORM
        </div>
        <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-6'>
          Built by Scientists,
          <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            For All
          </span>
        </h2>
        <p className='text-lg text-gray-700 mb-8 leading-relaxed'>
          CultiVision is developed by the McDonald-Nandi Lab at UC Davis,
          bringing together cutting-edge research in cellular agriculture
          with practical industry applications.
        </p>
        
        <div className='space-y-6'>
          <div className='flex items-start group cursor-pointer'>
            <div className='flex-shrink-0'>
              <div className='flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg cursor-pointer'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300'>
                Validated Methodologies
              </h3>
              <p className='text-base text-gray-600'>
                Based on peer-reviewed research and industry-standard
                calculations for accurate cost modeling.
              </p>
            </div>
          </div>
          
          <div className='flex items-start group cursor-pointer'>
            <div className='flex-shrink-0'>
              <div className='flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg cursor-pointer'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300'>
                Industry Applications
              </h3>
              <p className='text-base text-gray-600'>
                Used by researchers, investors, and industry professionals
                for strategic decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className='mt-12 lg:mt-0'>
        <div className='bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 cursor-pointer'>
          <div className='text-7xl mb-4'>🧬</div>
          <h3 className='text-2xl font-bold text-gray-900 mb-3'>
            UC Davis McDonald-Nandi Lab
          </h3>
          <p className='text-gray-700 mb-6 leading-relaxed'>
            Leading research in cellular agriculture and sustainable food
            production technologies.
          </p>
          <a
            href='https://mcdonald-nandi.ech.ucdavis.edu/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 bg-white border-2 border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition group cursor-pointer'
          >
            Visit Lab Website
            <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<section className='relative py-20 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 overflow-hidden'>
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
  </div>
  
  <div className='max-w-4xl mx-auto text-center px-6 relative z-10'>
    <h2 className='text-4xl sm:text-5xl font-bold text-white mb-6'>
      Ready to Analyze Your Production Costs?
    </h2>
    <p className='text-xl text-gray-300 mb-10 leading-relaxed'>
      Start exploring the economics of cultivated meat production with our
      interactive, AI-powered dashboard.
    </p>
    <Link href='/dashboard'>
      <button className='bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/50 cursor-pointer'>
        Access Dashboard
      </button>
    </Link>
  </div>
</section>

<footer className='bg-white border-t border-gray-200 py-12'>
  <div className='max-w-7xl mx-auto px-6'>
    <div className='grid md:grid-cols-2 gap-8 mb-8'>
      <div className='flex flex-col gap-6'>
        <Link href={UCD_EXT_LINK} target='_blank' rel='noreferrer nofollow' onClick={() => trackFooterLinkClick("UC Davis")} className='cursor-pointer'>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/uc-davis-logo.svg`}
            alt='UC Davis Logo'
            width={140}
            height={140}
            priority
            className='object-contain'
          />
        </Link>
        <Link href={LAB_EXT_LINK} target='_blank' rel='noreferrer nofollow' onClick={() => trackFooterLinkClick("McDonald-Nandi Lab")} className='cursor-pointer'>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/mnl-logo.png`}
            alt='McDonald-Nandi Lab Logo'
            width={180}
            height={180}
            priority
            className='object-contain'
          />
        </Link>
      </div>
      <div className='flex flex-col gap-3 md:items-end justify-center'>
        <Link href={LAB_EXT_LINK} target='_blank' rel='noreferrer nofollow' className='text-base font-semibold hover:text-green-600 text-gray-700 transition cursor-pointer' onClick={() => trackFooterLinkClick("McDonald-Nandi Lab")}>
          McDonald-Nandi Lab
        </Link>
        <Link href={TERMS_LINK} target='_blank' rel='noreferrer nofollow' className='text-base hover:text-green-600 text-gray-600 transition cursor-pointer' onClick={() => trackFooterLinkClick("Terms of Use")}>
          Terms of Use
        </Link>
        <Link href={PRIVACY_POL_LINK} target='_blank' rel='noreferrer nofollow' className='text-base hover:text-green-600 text-gray-600 transition cursor-pointer' onClick={() => trackFooterLinkClick("Privacy Policy")}>
          Privacy Policy
        </Link>
        <div className='text-base hover:text-green-600 text-gray-600 cursor-pointer transition' onClick={openModal}>
          Authors
        </div>
      </div>
    </div>
    <div className='flex flex-col lg:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 text-sm text-gray-500'>
      {/* <div className='text-sm text-gray-500 text-center'>
        <span>© 2025 </span>
        <Link href={UCD_EXT_LINK} className='hover:text-green-600 transition cursor-pointer'>
          The Regents of the University of California.
        </Link>
        <span> All Rights Reserved.</span>
      </div> */}
      <div className=''>
        Made with ❤️ for sustainable food production
      </div>
      <div>
        <a href="https://aun.sh" target="_blank" rel="noreferrer noopener" className="hover:text-green-500">@aunsh </a>  
        <span>and</span> <a href="https://twitter.com/vgore" target="_blank" rel="noreferrer noopener"  className="hover:text-green-500">@vgore</a>
      </div>
    </div>
  </div>
</footer>
      <InfoModal isOpen={isAuthorModalOpen} onClose={closeModal}>
        <Authors />
      </InfoModal>
    </div>
  );
};

export default LandingPage;
