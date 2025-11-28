import type React from "react";

export default function EmptyState(
  { title, description, action }: { title: string, description: string, action?: React.ReactNode }
) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
      <div className="text-2xl font-semibold mb-2">{title}</div>
      <div className="text-gray-500 mb-6">{description}</div>
      {action}
    </div>
  )
}