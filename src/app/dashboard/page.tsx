"use client";

import BioreactorChart from "@/components/bioreactor/charts/cost-distribution";
import LaborCostAnnualGraph from "@/components/bioreactor/charts/labor-cost-annual";
import LaborCostHourlyGraph from "@/components/bioreactor/charts/labor-cost-hourly";
import FlowDiagram from "@/components/bioreactor/flow-diagram";
import ParameterForm from "@/components/bioreactor/form";
import ImageModal from "@/components/bioreactor/image-modal";
import SingleValueCard from "@/components/bioreactor/sv-card";
import ExpenseTable from "@/components/bioreactor/tables/cost-breakdown";
import LaborCostTable from "@/components/bioreactor/tables/labor-cost";
import MetricsTable from "@/components/bioreactor/tables/summary";
import Container from "@/components/container";
import Footer from "@/components/footer";
import ProtectedRoute from "@/components/protected-route";
import { useAccessControl } from "@/context/access-control-context";
import { useCalculations } from "@/context/calculation-context";
import { useModal } from "@/context/modal-context";
import { useToast } from "@/context/toast-context";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";
import { useEffect } from "react";
import Loading from "../loading";

type ExpenseKeys =
  | "cogsWithDepreciation"
  | "cogsWithoutDepreciation"
  | "facilitiesNeeded"
  | "operatingExpenses";

const svcValues: Record<ExpenseKeys, { title: string; unit: string }> = {
  cogsWithDepreciation: {
    title: "COGS with depreciation",
    unit: "$/kg",
  },
  cogsWithoutDepreciation: {
    title: "COGS without depreciation",
    unit: "$/kg",
  },
  facilitiesNeeded: {
    title: "Needed for 100M kg/yr",
    unit: "Facilities",
  },
  operatingExpenses: {
    title: "Operating Expenses",
    unit: "million $/yr",
  },
};

const Dashboard = () => {
  const { activeReactorId, expenses, isUrlParamProcessed } = useCalculations();
  const { isLoading } =
      useAccessControl();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { activateToast } = useToast();

  usePageViewTracking();

  useEffect(() => {
    if (
      isUrlParamProcessed &&
      new URLSearchParams(window.location.search).has("r") &&
      !isLoading
    ) {
      activateToast("Dashboard loaded with saved inputs!", "info");
    }
  }, [isUrlParamProcessed, isLoading]);

  if (!expenses) {
    return <Loading />;
  }
  
    return (
      <ProtectedRoute>
        <main className='min-h-screen'>
          <div className='flex flex-col lg:flex-row h-full pt-18 gap-2'>
            <div
              className='w-full lg:w-1/4 pt-6 px-0 lg:p lg:pb-24 lg:h-full lg:overflow-y-auto lg:fixed lg:left-4 lg:top-16 flex flex-col md:items-center md:justify-start gap-6 mr-2'
              aria-label='Input Form and Process Flow Diagram'
            >
              <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 lg:w-full'>
                <ParameterForm />
              </div>
              <div
                className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 flex flex-col gap-y-2 cursor-pointer w-full'
                onClick={openModal}
              >
                <h3 className='text-lg font-semibold text-gray-700 text-center'>
                  Process Flow Diagram
                </h3>
                <div className='hover:opacity-90 transition-opacity'>
                  <FlowDiagram
                    bioreactorId={activeReactorId}
                    showTitle={false}
                  />
                </div>

                <div className='text-center text-sm text-green-600 hover:text-blue-500'>
                  Click to enlarge
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 hidden lg:block lg:w-full'>
                <Footer />
              </div>
            </div>

            <div className='w-full lg:w-3/4 lg:ml-[26%] pt-5 px-0 lg:p-4 overflow-y-auto'>
              <div className='flex flex-col gap-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                  {Object.entries(svcValues).map(([key, value]) => (
                    <Container key={key}>
                      <SingleValueCard
                        title={value.title}
                        unit={value.unit}
                        value={expenses[key as ExpenseKeys]}
                      />
                    </Container>
                  ))}
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                  <Container>
                    <BioreactorChart expenses={expenses} />
                  </Container>
                  <Container>
                    <ExpenseTable expenses={expenses} />
                  </Container>
                </div>

                <div className='grid grid-cols-1 gap-4'>
                  <Container className='h-full'>
                    <MetricsTable expenses={expenses} />
                  </Container>
                </div>

                {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <Container>
                    <LaborCostHourlyGraph />
                  </Container>
                  <Container>
                    <LaborCostAnnualGraph />
                  </Container>
                </div> */}

                <div className='grid grid-cols-1 gap-4'>
                  <Container>
                    <LaborCostTable />
                  </Container>
                </div>
              </div>
            </div>
            <div className='mb-8 lg:mb-0 lg:hidden w-full flex justify-center items-center'>
              <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 w-96'>
                <Footer />
              </div>
            </div>
          </div>

          {isModalOpen && (
            <ImageModal bioreactorId={activeReactorId} onClose={closeModal} />
          )}
        </main>
      </ProtectedRoute>
    );
};

export default Dashboard;
