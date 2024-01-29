"use client"

import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface EmployeeBannerProps {
    name: string | null | undefined;
}

const EmployeeBanner = ({
    name
}: EmployeeBannerProps) => {
  return (
    <div className='w-full md:max-w-2xl px-4 py-3 text-sm bg-orange-100/80 border-orange-300 text-orange-500 border rounded-lg mb-2 flex items-center gap-2'>
        <AlertTriangle className='text-orange-500 w-5 h-5' />
        {name ? name : 'This employee'} is not verified yet!
    </div>
  )
}

export default EmployeeBanner