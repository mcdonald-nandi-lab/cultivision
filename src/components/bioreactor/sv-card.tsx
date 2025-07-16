import React from 'react'
import { formatNumber } from './tables/summary';

interface SingleValueCardProps {
  title: string;
  value: number;
  unit: string;
}

const SingleValueCard = ({ title, value, unit }: SingleValueCardProps) => {
  return (
    <div className='flex flex-col items-center justify-around w-full h-full px-4 gap-2 text-gray-600'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='text-2xl font-bold text-gray-600'>
          {formatNumber(value, 2)}
        </div>
        <div className='text-sm mb-2 text-gray-400'>{unit}</div>
      </div>
      <div className='text-sm text-center'>{title}</div>
    </div>
  );
}

export default SingleValueCard