"use client";

import Image from "next/image";
import { getBioreactorById } from "@/lib/bioreactors";

interface FlowDiagramProps {
  bioreactorId: string;
}

export default function FlowDiagram({ bioreactorId }: FlowDiagramProps) {
  const bioreactor = getBioreactorById(bioreactorId);

  if (!bioreactor) {
    return <div className='text-center p-4'>Bioreactor not found</div>;
  }

  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>
        Flow Diagram: {bioreactor.name}
      </h2>
      <div className='relative h-[400px] w-full'>
        <Image
          src={bioreactor.image}
          alt={`${bioreactor.name} Flow Diagram`}
          fill
          style={{ objectFit: "contain" }}
          priority
          className='rounded-lg'
        />
      </div>
    </div>
  );
}
