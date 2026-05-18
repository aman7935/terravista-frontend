import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  variant: {
    default:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-500 hover:to-indigo-500",
    destructive:
      "bg-red-500/90 text-white shadow-sm hover:bg-red-500",
    outline:
      "border border-white/10 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/20",
    secondary:
      "bg-white/10 text-foreground hover:bg-white/20",
    ghost: "text-foreground/70 hover:text-foreground hover:bg-white/10",
    link: "text-violet-400 underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-lg px-3 text-sm",
    lg: "h-11 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const v = buttonVariants.variant[variant]
    const s = buttonVariants.size[size]
    return (
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 disabled:pointer-events-none disabled:opacity-50",
          v,
          s,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
