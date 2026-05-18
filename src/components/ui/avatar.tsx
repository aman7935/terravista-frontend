import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback?: string
  src?: string
}

function Avatar({ className, fallback, src, ...props }: AvatarProps) {
  const initials = fallback
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={fallback || "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-medium text-white">
          {initials || "?"}
        </div>
      )}
    </div>
  )
}

export { Avatar }
