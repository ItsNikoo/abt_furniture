import React from "react";

export default function LoadingPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg
        className="animate-spin h-12 w-12 text-mainPurple mb-4"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="6"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M44 24c0-11.046-8.954-20-20-20v6c7.732 0 14 6.268 14 14h6z"
        />
      </svg>
      <span className="text-lg text-black font-medium">Загрузка данных...</span>
    </div>
  );
}
