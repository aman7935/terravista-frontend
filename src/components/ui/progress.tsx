"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: "default" | "success" | "warning" | "danger"
}

function Progress({
  className,
  value = 0,
  max = 100,
  variant = "default",
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const variants = {
    default: "bg-gradient-to-r from-violet-500 to-indigo-500",
    success: "bg-gradient-to-r from-emerald-500 to-green-500",
    warning: "bg-gradient-to-r from-amber-500 to-orange-500",
    danger: "bg-gradient-to-r from-red-500 to-rose-500",
  }

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-white/10",
        className,
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-700 ease-out",
          variants[variant],
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export { Progress }
