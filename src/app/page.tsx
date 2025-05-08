"use client";

import { useCalculations } from "@/context/calculation-context";
import { useState } from "react";
import Navbar from "@/components/navbar";
import ParameterForm from "@/components/bioreactor/form";
import FlowDiagram from "@/components/bioreactor/flow-diagram";
import BioreactorBarChart from "@/components/bioreactor/bar-chart";
import ExpenseTable from "@/components/bioreactor/expense-table";
import BioreactorChart from "@/components/bioreactor/chart";
import MetricsTable from "@/components/bioreactor/metrics-table";
import ImageModal from "@/components/bioreactor/image-modal";
import Loading from "./loading";

export default function Home() {
  const { activeReactorId, expenses } = useCalculations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!expenses) {
    return (
      <Loading />
    );
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex h-full pt-20 mx-8'>
        <div className='w-full lg:w-1/4 pt-5 p-4 lg:h-full lg:overflow-y-auto lg:fixed lg:left-4 lg:top-18'>
          <div className='flex flex-col gap-6'>
            <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100'>
              <ParameterForm />
            </div>

            <div
              className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 mb-16 flex flex-col gap-y-2 cursor-pointer'
              onClick={() => setIsModalOpen(true)}
            >
              <h3 className='text-lg font-semibold text-gray-700 text-center'>
                Bioreactor View
              </h3>
              <div className='hover:opacity-90 transition-opacity'>
                <FlowDiagram
                  bioreactorId={activeReactorId}
                  height='200px'
                  showTitle={false}
                />
              </div>
              <div className='text-center text-sm text-blue-600'>
                Click to enlarge
              </div>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-3/4 lg:ml-[25%] p-4 overflow-y-auto'>
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100'>
                <BioreactorBarChart expenses={expenses} />
              </div>
              <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 h-full'>
                <ExpenseTable expenses={expenses} />
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100'>
                <BioreactorChart expenses={expenses} />
              </div>
              <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 h-full'>
                <MetricsTable expenses={expenses} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ImageModal
          bioreactorId={activeReactorId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
