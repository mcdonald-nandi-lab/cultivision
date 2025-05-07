'use client';

import { useState, useEffect } from 'react';
import Navbar from './navbar';
import BioreactorChart from '@/app/components/bioreactor/chart';
import ParameterForm from '@/app/components/bioreactor/form';
import FlowDiagram from '@/app/components/bioreactor/flow-diagram';
import { ProductionCosts, CalculatedExpenses } from '@/types';
import { bioreactors, calculateExpenses, defaultProductionCosts } from '@/lib/bioreactors';

export default function Dashboard() {
  // Set the first bioreactor as default
  const [activeReactorId, setActiveReactorId] = useState<string>(bioreactors[0]?.id || '');
  const [costs, setCosts] = useState<ProductionCosts>(defaultProductionCosts);
  const [expenses, setExpenses] = useState<CalculatedExpenses | null>(null);

  // Calculate expenses whenever the active reactor or costs change
  useEffect(() => {
    if (activeReactorId) {
      const bioreactor = bioreactors.find(reactor => reactor.id === activeReactorId);
      if (bioreactor) {
        const calculatedExpenses = calculateExpenses(bioreactor, costs);
        setExpenses(calculatedExpenses);
      }
    }
  }, [activeReactorId, costs]);

  const handleReactorChange = (reactorId: string) => {
    setActiveReactorId(reactorId);
    // Reset costs to default when changing reactors
    setCosts(defaultProductionCosts);
  };

  const handleCostsUpdate = (newCosts: ProductionCosts) => {
    setCosts(newCosts);
  };

  if (!expenses) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeReactorId={activeReactorId} 
        onReactorChange={handleReactorChange} 
      />
      
      <main className="container mx-auto px-4 pb-8">
        <div className="flex flex-col space-y-6 h-screen">
          {/* Top section: Chart and Form side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Left side: Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <BioreactorChart expenses={expenses} />
            </div>
            
            {/* Right side: Form */}
            <div>
              <ParameterForm 
                onUpdate={handleCostsUpdate} 
                bioreactorId={activeReactorId} 
              />
            </div>
          </div>
          
          {/* Bottom section: Flow Diagram */}
          <div className="flex-1">
            <FlowDiagram bioreactorId={activeReactorId} />
          </div>
        </div>
      </main>
    </div>
  )};