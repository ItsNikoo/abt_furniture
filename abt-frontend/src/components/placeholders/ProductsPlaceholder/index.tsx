import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductsPlaceholder() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-center">
        <Skeleton className="w-full max-w-md h-10"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[...Array(4)].map((_, idx) => (
          <div key={idx}
               className="rounded-xl shadow-xl border-0 bg-white/90 hover:shadow-2xl transition-shadow duration-300 p-4">
            <div className="flex flex-row items-start justify-between pb-2">
              <div>
                <Skeleton className="h-6 w-32 mb-2"/>
                <Skeleton className="h-4 w-24 mb-1"/>
                <Skeleton className="h-4 w-20"/>
              </div>
              <Skeleton className="h-8 w-8 rounded-full"/>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <Skeleton className="w-40 h-40 rounded-lg"/>
                <div className="flex-1">
                  <Skeleton className="h-5 w-24 mb-2"/>
                  <Skeleton className="h-4 w-32 mb-1"/>
                  <Skeleton className="h-4 w-28 mb-1"/>
                  <Skeleton className="h-4 w-40 mb-1"/>
                </div>
              </div>
              <div className="mt-3">
                <Skeleton className="h-3 w-16 mb-2"/>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-md"/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

