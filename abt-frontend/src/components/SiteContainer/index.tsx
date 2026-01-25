import React from "react"

interface Props
{
  children: React.ReactNode
  className?: string
}

export default function SiteContainer({children, className = ''}: Props) {
  return (
    <div
      className={`
        w-full
        max-w-[1500px]
        mx-auto
        px-4
        md:px-8
        lg:px-12
        ${className}
      `}
    >
      {children}
    </div>
  )
}
