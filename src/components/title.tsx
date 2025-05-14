'use client'

import React from 'react'

interface TitleProps {
    title: string;
}

const Title = ({ title }: TitleProps) => {
  return <div className='text-md 2xl:text-lg font-semibold text-slate-700'>{title}</div>;
}

export default Title