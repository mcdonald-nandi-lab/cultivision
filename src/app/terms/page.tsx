"use client";

import { usePageViewTracking } from "@/hooks/use-page-view-tracking";
import Head from "next/head";

export default function Terms() {
  usePageViewTracking();

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Terms and Conditions | CultiVision</title>
        <meta
          name='description'
          content='Terms and Conditions for CultiVision'
        />
      </Head>
      <main className='max-w-4xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='p-6 sm:p-8'>
          <h1 className='text-2xl font-bold text-center mb-8 text-gray-900'>
            TERMS AND CONDITIONS
          </h1>
          <div className='prose max-w-none'>
            <p className='mb-4'>
              These terms and conditions (the &quot;Terms and Conditions&quot;)
              govern the use of{" "}
              <a
                href='https://mcdonald-nandi-lab.github.io/cultivision/'
                className='text-green-700 hover:text-green-800'
              >
                https://mcdonald-nandi-lab.github.io/cultivision/
              </a>{" "}
              also called as CultiVision (the &quot;Site&quot;). This Site is
              operated by the McDonald-Nandi Lab at the University of
              California, Davis. This Site is an educational/academic tool.
            </p>

            <p className='mb-6 font-semibold'>
              BY ACCESSING OR USING THIS SITE, YOU INDICATE THAT YOU HAVE READ,
              UNDERSTAND, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS
              AND ALL TERMS INCORPORATED BY REFERENCE. IF YOU DO NOT AGREE TO
              ALL THESE TERMS, DO NOT USE THIS SITE.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Eligibility and Access
            </h2>
            <p className='mb-6'>
              You must be at least 13 years of age to use this Site. By using
              this Site, you represent and warrant that you meet this age
              requirement and have the legal capacity to enter into these Terms
              and Conditions.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Intellectual Property Rights
            </h2>
            <p className='mb-4'>
              All content published and made available on our Site is the
              property of CultiVision, the McDonald-Nandi Lab, the University of
              California, Davis, and/or the Site&apos;s creators. This includes,
              but is not limited to images, text, logos, documents, downloadable
              files, code, data, models, algorithms, and anything that
              contributes to the composition of our Site.
            </p>
            <p className='mb-4'>
              <strong>Attribution Required:</strong> ANY use of any property,
              content, or materials from this Site for ANY purpose (including
              but not limited to academic, educational, research, or personal
              use) requires proper attribution to CultiVision and the
              McDonald-Nandi Lab at the University of California, Davis.
              Attribution must include: (i) the name &quot;CultiVision -
              McDonald-Nandi Lab, UC Davis&quot;, (ii) a link to this Site, and
              (iii) indication if changes were made.
            </p>
            <p className='mb-4'>
              <strong>
                Commercial Use Strictly Prohibited Without License:
              </strong>{" "}
              Any use of Site content for commercial purposes is STRICTLY
              PROHIBITED without a prior written license agreement. Commercial
              use includes but is not limited to: (i) use in commercial products
              or services, (ii) use for commercial advantage or monetary
              compensation, (iii) incorporation into proprietary software or
              systems, (iv) redistribution for profit. To request a commercial
              license, contact us using the details below. Unauthorized
              commercial use may result in legal action and liability for
              damages.
            </p>
            <p className='mb-6'>
              <strong>No Transfer of Rights:</strong> Nothing in these Terms
              grants you any right, title, or interest in the Site or its
              content except for the limited rights expressly set forth herein.
              All rights not expressly granted are reserved.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Acceptable Use Policy
            </h2>
            <p className='mb-3'>You agree NOT to use the Site:</p>
            <ul className='list-disc pl-6 mb-6'>
              <li>
                For any unlawful purpose or to solicit others to perform
                unlawful acts
              </li>
              <li>
                To violate any international, federal, provincial, or state
                regulations, rules, laws, or local ordinances
              </li>
              <li>
                To infringe upon or violate our intellectual property rights or
                the intellectual property rights of others
              </li>
              <li>To submit false or misleading information</li>
              <li>
                To upload or transmit viruses or any other type of malicious
                code
              </li>
              <li>To collect or track the personal information of others</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>
                To interfere with or circumvent the security features of the
                Site
              </li>
              <li>
                To copy, reproduce, or redistribute Site content without proper
                authorization and attribution
              </li>
              <li>
                For any commercial purpose without explicit written permission
              </li>
            </ul>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Export Control Compliance
            </h2>
            <p className='mb-4'>
              This Site may contain technical data, software, or technology that
              is subject to U.S. export control laws, including the U.S. Export
              Administration Regulations (EAR) and International Traffic in Arms
              Regulations (ITAR). You agree to comply with all applicable export
              and re-export control laws and regulations.
            </p>
            <p className='mb-6'>
              You specifically agree that you will not access, download, export,
              re-export, or transfer, directly or indirectly, any restricted
              content from this Site to: (i) any country subject to U.S. trade
              sanctions, (ii) any individual or entity on the U.S. Treasury
              Department&apos;s list of Specially Designated Nationals or the
              U.S. Department of Commerce Denied Persons List, or (iii) any
              end-use prohibited by U.S. export laws. You represent and warrant
              that you are not located in any such country or on any such list.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Disclaimers and Warranties
            </h2>
            <p className='mb-4'>
              THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND
              &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE
              DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE, AND NON-INFRINGEMENT.
            </p>
            <p className='mb-6'>
              We do not warrant that: (i) the Site will be uninterrupted,
              secure, or error-free, (ii) the results obtained from use of the
              Site will be accurate or reliable, (iii) any errors will be
              corrected. You assume all risk for any damage to your computer
              system or loss of data that results from use of the Site.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Limitation of Liability
            </h2>
            <p className='mb-6'>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL
              CULTIVISION, THE MCDONALD-NANDI LAB, THE UNIVERSITY OF CALIFORNIA,
              DAVIS, OR THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS,
              AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, PUNITIVE, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING
              BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE,
              DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO
              THE USE OF, OR INABILITY TO USE, THE SITE, EVEN IF WE HAVE BEEN
              ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR
              AGGREGATE LIABILITY EXCEED ONE HUNDRED DOLLARS ($100.00).
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Indemnification
            </h2>
            <p className='mb-6'>
              You agree to defend, indemnify, and hold harmless CultiVision, the
              McDonald-Nandi Lab, the University of California, Davis, and their
              respective officers, directors, employees, agents, licensors, and
              suppliers from and against any and all claims, damages,
              obligations, losses, liabilities, costs, debt, and expenses
              (including but not limited to attorney&apos;s fees) arising from:
              (i) your use of and access to the Site, (ii) your violation of any
              term of these Terms and Conditions, (iii) your violation of any
              third party right, including without limitation any copyright,
              property, or privacy right, or (iv) any claim that your use caused
              damage to a third party.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Termination
            </h2>
            <p className='mb-6'>
              We reserve the right to terminate or suspend your access to the
              Site immediately, without prior notice or liability, for any
              reason whatsoever, including without limitation if you breach
              these Terms and Conditions. Upon termination, your right to use
              the Site will immediately cease.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Privacy and Data Collection
            </h2>
            <p className='mb-6'>
              Your use of the Site may be subject to data collection and use as
              described in our Privacy Policy. By using the Site, you consent to
              such data collection and use. We reserve the right to collect
              usage analytics and performance data to improve the Site.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Third-Party Links
            </h2>
            <p className='mb-6'>
              The Site may contain links to third-party websites or services
              that are not owned or controlled by us. We have no control over
              and assume no responsibility for the content, privacy policies, or
              practices of any third-party websites or services.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Governing Law and Dispute Resolution
            </h2>
            <p className='mb-4'>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of the State of California, United
              States, without regard to its conflict of law provisions.
            </p>
            <p className='mb-6'>
              Any dispute arising out of or relating to these Terms and
              Conditions or the Site shall be resolved exclusively in the state
              or federal courts located in Yolo County, California, and you
              consent to the personal jurisdiction of such courts.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Severability and Waiver
            </h2>
            <p className='mb-4'>
              If any provision of these Terms and Conditions is held to be
              invalid, illegal, or unenforceable, the remaining provisions shall
              continue in full force and effect.
            </p>
            <p className='mb-6'>
              No waiver of any term of these Terms and Conditions shall be
              deemed a further or continuing waiver of such term or any other
              term, and our failure to assert any right or provision under these
              Terms shall not constitute a waiver of such right or provision.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Entire Agreement
            </h2>
            <p className='mb-6'>
              These Terms and Conditions, together with any other legal notices
              and agreements published by us on the Site, constitute the entire
              agreement between you and us concerning the Site.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Changes to Terms
            </h2>
            <p className='mb-6'>
              We reserve the right to modify these Terms and Conditions at any
              time, effective upon posting of an updated version on this Site.
              You are responsible for regularly reviewing these Terms. Continued
              use of the Site after any such changes constitutes your consent to
              such changes.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Copyright Infringement
            </h2>
            <p className='mb-6'>
              If you believe that any content on the Site violates your
              copyright, please contact us with: (i) identification of the
              copyrighted work, (ii) identification of the allegedly infringing
              material, (iii) your contact information, (iv) a statement of good
              faith belief, and (v) a statement of accuracy under penalty of
              perjury.
            </p>

            <h2 className='text-xl font-bold mt-6 mb-2 text-gray-900'>
              Contact Information
            </h2>
            <p className='mb-2'>
              For any questions, concerns, or requests regarding these Terms and
              Conditions, including commercial licensing inquiries, please
              contact us at:
            </p>
            <p className='mb-1'>
              <strong>Email:</strong> snandi@ucdavis.edu | kamcdonald@ucdavis.edu
            </p>
            <p className='mb-1'>
              <strong>Address:</strong> McDonald-Nandi Lab
            </p>
            <p className='mb-1'>University of California, Davis</p>
            <p className='mb-6'>1 Shields Ave, Davis, CA 95616</p>

            <div className='flex justify-between items-center mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500'>
              <p>Effective Date: 25th day of June, 2025</p>
              <p>© 2025 The Regents of the University of California</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
