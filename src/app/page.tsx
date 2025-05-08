"use client";

import { useCalculations } from "@/context/calculation-context";
import { useState } from "react";
import Navbar from "@/app/components/navbar";
import ParameterForm from "@/app/components/bioreactor/form";
import FlowDiagram from "@/app/components/bioreactor/flow-diagram";
import BioreactorBarChart from "@/app/components/bioreactor/bar-chart";
import ExpenseTable from "@/app/components/bioreactor/expense-table";
import BioreactorChart from "@/app/components/bioreactor/chart";
import MetricsTable from "@/app/components/bioreactor/metrics-table";
import ImageModal from "@/app/components/bioreactor/image-modal";

export default function Home() {
  const { activeReactorId, expenses } = useCalculations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!expenses) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='flex h-full pt-20 mx-8'>
        <div className='w-full lg:w-1/4 pt-5 p-4 lg:h-full lg:overflow-y-auto lg:fixed lg:left-4 lg:top-18'>
          <div className='flex flex-col gap-6'>
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <ParameterForm />
            </div>

            <div className='bg-white rounded-lg shadow-sm p-4 mb-16 flex flex-col gap-y-2'>
              <h3 className='text-lg font-semibold text-slate-700 text-center'>
                Bioreactor View
              </h3>
              <div
                onClick={() => setIsModalOpen(true)}
                className='cursor-pointer hover:opacity-90 transition-opacity'
              >
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
          <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <BioreactorBarChart expenses={expenses} />
              </div>
              <div className='bg-white rounded-lg shadow-sm p-6 h-full'>
                <ExpenseTable expenses={expenses} />
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <BioreactorChart expenses={expenses} />
              </div>
              <div className='bg-white rounded-lg shadow-sm p-6 h-full'>
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
