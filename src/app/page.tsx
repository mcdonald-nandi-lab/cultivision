"use client";

import { useCalculations } from "@/context/calculation-context";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import ParameterForm from "@/components/bioreactor/form";
import FlowDiagram from "@/components/bioreactor/flow-diagram";
import BioreactorBarChart from "@/components/bioreactor/charts/cost-breakdown";
import ExpenseTable from "@/components/bioreactor/tables/expense-breakdown";
import BioreactorChart from "@/components/bioreactor/charts/cost-distribution";
import MetricsTable from "@/components/bioreactor/tables/performance-metrics";
import LaborCostTable from "@/components/bioreactor/tables/labor-cost";
import LaborCostHourlyGraph from "@/components/bioreactor/charts/labor-cost-hourly";
import LaborCostAnnualGraph from "@/components/bioreactor/charts/labor-cost-annual";
import ImageModal from "@/components/bioreactor/image-modal";
import Toast from "@/components/toast";
import Loading from "./loading";
import Container from "@/components/container";
import Footer from "@/components/footer";

const URL_COPIED_EVENT = "urlCopied";

const Home = () => {
  const { activeReactorId, expenses, isUrlParamProcessed } = useCalculations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );

  useEffect(() => {
    const handleUrlCopied = () => {
      setToastMessage("Input URL copied to clipboard!");
      setToastType("success");
      setShowToast(true);
    };

    window.addEventListener(URL_COPIED_EVENT, handleUrlCopied);

    return () => {
      window.removeEventListener(URL_COPIED_EVENT, handleUrlCopied);
    };
  }, []);

  useEffect(() => {
    if (
      isUrlParamProcessed &&
      new URLSearchParams(window.location.search).has("p")
    ) {
      setToastMessage("Dashboard loaded with saved inputs!");
      setToastType("info");
      setShowToast(true);
    }
  }, [isUrlParamProcessed]);

  if (!expenses) {
    return <Loading />;
  }

  return (
    <main className='min-h-screen'>
      <Navbar />
      <div className='flex flex-col lg:flex-row h-full pt-20 mx-8 gap-2'>
        <div
          className='w-full lg:w-1/4 pt-5 px-0 lg:p-4 lg:pb-24 lg:h-full lg:overflow-y-auto lg:fixed lg:left-4 lg:top-18 flex flex-col md:items-center md:justify-start gap-6'
          aria-label='Input Form and Bioreactor View'
        >
          <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 lg:w-full'>
            <ParameterForm />
          </div>
          <div
            className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 flex flex-col gap-y-2 cursor-pointer w-full'
            onClick={() => setIsModalOpen(true)}
          >
            <h3 className='text-lg font-semibold text-gray-700 text-center'>
              Bioreactor View
            </h3>
            <div className='hover:opacity-90 transition-opacity'>
              <FlowDiagram bioreactorId={activeReactorId} showTitle={false} />
            </div>

            <div className='text-center text-sm text-green-600 hover:text-blue-500'>
              Click to enlarge
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 hidden lg:block lg:w-full'>
            <Footer />
          </div>
        </div>

        <div className='w-full lg:w-3/4 lg:ml-[25%] pt-4 px-0 lg:p-4 overflow-y-auto'>
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <Container>
                <BioreactorBarChart expenses={expenses} />
              </Container>
              <Container>
                <ExpenseTable expenses={expenses} />
              </Container>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <Container>
                <BioreactorChart expenses={expenses} />
              </Container>
              <Container className='h-full'>
                <MetricsTable expenses={expenses} />
              </Container>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <Container>
                <LaborCostHourlyGraph />
              </Container>
              <Container>
                <LaborCostAnnualGraph />
              </Container>
            </div>

            <div className='grid grid-cols-1 gap-4'>
              <Container>
                <LaborCostTable />
              </Container>
            </div>
          </div>
        </div>
        <div className='lg:hidden w-full flex justify-center items-center'>
          <div className='bg-white rounded-lg shadow-md p-4 border border-solid border-gray-100 w-96'>
            <Footer />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          bioreactorId={activeReactorId}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    </main>
  );
};

export default Home;
