"use client";

import CapexBreakdownTable from "@/components/bioreactor/tables/capex-breakdown";
import LaborCostTable from "@/components/bioreactor/tables/labor-cost";
import { InfoModal } from "@/components/info-modal";
import { trackButtonClick } from "@/lib/analytics";
import { createContext, ReactNode, useContext, useState } from "react";

type MaximizeContextType = {
  isMaxModalOpen: boolean;
  openMaxModal: (id: MaximizeIdTypes) => void;
  closeMaxModal: () => void;
};

export type MaximizeIdTypes = "capexBreakdownTable" | "laborCostTable" | null;


const getModalComponent = (id: MaximizeIdTypes): ReactNode => {
  switch (id) {
    case "capexBreakdownTable":
      return <CapexBreakdownTable />;
    case "laborCostTable":
      return <LaborCostTable />;
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
