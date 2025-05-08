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
      />

      <div className='flex h-[calc(100vh-64px)] pt-16' style={{ border: '1px solid' }} >
        <div className='w-full lg:w-1/4 p-4 lg:h-full lg:overflow-y-auto lg:fixed lg:left-0 lg:top-16 lg:bottom-0'>
          <div className='flex flex-col gap-6'>
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <ParameterForm
                onUpdate={handleCostsUpdate}
                bioreactorId={activeReactorId}
              />
            </div>

            <div className='bg-white rounded-lg shadow-sm p-4'>
              <h3 className='text-lg font-semibold text-slate-700 mb-2'>
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
                <div className='text-center text-sm mt-2 text-blue-600'>
                  Click to enlarge
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - scrollable content */}
        <div className='w-full lg:w-3/4 lg:ml-[25%] p-4 overflow-y-auto'>
          <div className='flex flex-col gap-6'>
            {/* First row: Chart and Expense Table */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Pie chart */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <BioreactorChart expenses={expenses} />
              </div>

              {/* Expense Table */}
              <div className='bg-white rounded-lg shadow-sm p-6 h-full'>
                <ExpenseTable expenses={expenses} />
              </div>
            </div>

            {/* Second row: Bar Chart and Metrics Table */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Bar Chart */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <BioreactorBarChart expenses={expenses} />
              </div>

              {/* Metrics Table */}
              <div className='bg-white rounded-lg shadow-sm p-6 h-full'>
                <MetricsTable expenses={expenses} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged flow diagram */}
      {isModalOpen && (
        <ImageModal bioreactorId={activeReactorId} onClose={handleCloseModal} />
      )}
    </div>
  );
}
