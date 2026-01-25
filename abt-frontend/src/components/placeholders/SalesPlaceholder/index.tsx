'use client'
import {ChevronLeft, ChevronRight} from "lucide-react"

export default function SalesPlaceholder() {
  return (
    <div className="relative w-full min-h-[50vh] md:min-h-[60vh] mt-3 overflow-hidden bg-gray-100">
      <div className="absolute inset-0 flex justify-between items-center p-4 pointer-events-none">
        <div className="p-1 rounded-full shadow bg-gray-300">
          <ChevronLeft className="text-gray-400"/>
        </div>
        <div className="p-1 rounded-full shadow bg-gray-300">
          <ChevronRight className="text-gray-400"/>
        </div>
      </div>
    </div>
  )
}