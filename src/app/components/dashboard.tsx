"use client";

import { useState, useEffect } from "react";
import Navbar from "./navbar";
import BioreactorChart from "./bioreactor/chart";
import BioreactorBarChart from "./bioreactor/bar-chart";
import ParameterForm from "./bioreactor/form";
import FlowDiagram from "./bioreactor/flow-diagram";
import ImageModal from "./bioreactor/image-modal";
import ExpenseTable from "./bioreactor/expense-table";
import MetricsTable from "./bioreactor/metrics-table";
import { ProductionCosts, CalculatedExpenses } from "@/types";
import {
  bioreactors,
  calculateExpenses,
  defaultProductionCosts,
} from "@/lib/bioreactors";

export default function Dashboard() {
  const [activeReactorId, setActiveReactorId] = useState<string>(
    bioreactors[0]?.id || ""
  );
  const [costs, setCosts] = useState<ProductionCosts>(defaultProductionCosts);
  const [expenses, setExpenses] = useState<CalculatedExpenses | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (activeReactorId) {
      const bioreactor = bioreactors.find(
        (reactor) => reactor.id === activeReactorId
      );
      if (bioreactor) {
        const calculatedExpenses = calculateExpenses(bioreactor, costs);
        setExpenses(calculatedExpenses);
      }
    }
  }, [activeReactorId, costs]);

  const handleReactorChange = (reactorId: string) => {
    setActiveReactorId(reactorId);
    setCosts(defaultProductionCosts);
  };

  const handleCostsUpdate = (newCosts: ProductionCosts) => {
    setCosts(newCosts);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!expenses) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar
        activeReactorId={activeReactorId}
        onReactorChange={handleReactorChange}
        expenses={expenses}
      />

      <div className='flex h-full pt-20 mx-8'>
        <div className='w-full lg:w-1/4 pt-5 p-4 lg:h-full lg:overflow-y-auto lg:fixed lg:left-4 lg:top-18'>
          <div className='flex flex-col gap-6'>
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <ParameterForm
                onUpdate={handleCostsUpdate}
                bioreactorId={activeReactorId}
              />
            </div>

            <div className='bg-white rounded-lg shadow-sm p-4 mb-16 flex flex-col gap-y-2'>
              <h3 className='text-lg font-semibold text-slate-700 text-center'>
                Bioreactor View
              </h3>
              <div
                onClick={handleOpenModal}
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
        <ImageModal bioreactorId={activeReactorId} onClose={handleCloseModal} />
      )}
    </div>
  );
}
