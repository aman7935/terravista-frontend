import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "hot" | "warm" | "cold"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default:
      "bg-violet-500/15 text-violet-300 border-violet-500/30",
    secondary:
      "bg-white/10 text-foreground/70 border-white/10",
    destructive:
      "bg-red-500/15 text-red-300 border-red-500/30",
    outline:
      "border-white/10 text-foreground/70",
    hot: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warm: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    cold: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
