"use client";

import CapexDistribution from "@/components/bioreactor/charts/capex-distribution";
import OpexDistribution from "@/components/bioreactor/charts/opex-distribution";
import CapexBreakdownTable from "@/components/bioreactor/tables/capex-breakdown";
import OpexBreakdownTable from "@/components/bioreactor/tables/opex-breakdown";
import { InfoModal } from "@/components/info-modal";
import { trackButtonClick } from "@/lib/analytics";
import { createContext, ReactNode, useContext, useState } from "react";

type MaximizeContextType = {
  isMaxModalOpen: boolean;
  openMaxModal: (id: MaximizeIdTypes) => void;
  closeMaxModal: () => void;
};

export type MaximizeIdTypes =
  | "capexBreakdownTable"
  | "opexBreakdownTable"
  | "capexDistribution"
  | "opexDistribution"
  | null;


const getModalComponent = (id: MaximizeIdTypes): ReactNode => {
  switch (id) {
    case "capexBreakdownTable":
      return <CapexBreakdownTable />;
    case "capexDistribution":
      return <CapexDistribution />;
    case "opexBreakdownTable":
      return <OpexBreakdownTable />;
    case "opexDistribution":
      return <OpexDistribution />;
    default:
      return null;
  }
};

const MaximizeContext = createContext<MaximizeContextType | undefined>(undefined);

export const MaximizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMaxModalOpen, setIsMaxModalOpen] = useState(false);
  const [id, setId] = useState<MaximizeIdTypes>(null);

  const openMaxModal = (id: MaximizeIdTypes) => {
    setId(id);
    setIsMaxModalOpen(true);
    trackButtonClick("toggle_modal", "Max Modal Open");
  };
  const closeMaxModal = () => {
    setIsMaxModalOpen(false);
    trackButtonClick("toggle_modal", "Max Modal Close");  
  };

  return (
    <MaximizeContext.Provider
      value={{ isMaxModalOpen, openMaxModal, closeMaxModal }}
    >
      {children}
        <InfoModal isOpen={isMaxModalOpen} onClose={closeMaxModal}>
            {getModalComponent(id)}
        </InfoModal>
    </MaximizeContext.Provider>
  );
};

export const useMaximize = () => {
  const context = useContext(MaximizeContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
