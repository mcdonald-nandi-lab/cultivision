'use client'

import React from 'react'

interface TitleProps {
    title: string;
}

const Title = ({ title }: TitleProps) => {
  return <div className='text-md xl:text-lg 2xl:text-xl font-semibold text-slate-700'>{title}</div>;
}

export default Title