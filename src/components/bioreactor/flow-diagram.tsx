"use client";

import Image from "next/image";
import { getBioreactorById } from "@/lib/bioreactors";

interface FlowDiagramProps {
  bioreactorId: string;
  height?: string;
  showTitle?: boolean;
}

export default function FlowDiagram({
  bioreactorId,
  height = "400px",
  showTitle = true,
}: FlowDiagramProps) {
  const bioreactor = getBioreactorById(bioreactorId);

  if (!bioreactor) {
    return <div className='text-center p-4'>Bioreactor not found</div>;
  }

  return (
    <div className='w-full border border-gray-200 rounded-lg'>
      {showTitle && (
        <h2 className='text-xl font-semibold text-slate-700 mb-4'>
          Flow Diagram: {bioreactor.name}
        </h2>
      )}
      <div className='relative w-full' style={{ height }}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${bioreactor.image}`}
          alt={`${bioreactor.name} Flow Diagram`}
          fill
          priority
          className='rounded-lg object-contain'
        />
      </div>
    </div>
  );
}
