import { Suspense } from "react"
import { PropertiesPageContent } from "./content"

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="h-9 w-64 rounded-lg bg-white/10 animate-pulse mb-2" />
          <div className="h-4 w-32 rounded bg-white/5 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="aspect-[16/11] bg-white/10 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-white/5 animate-pulse" />
                <div className="flex gap-4">
                  <div className="h-3 w-12 rounded bg-white/5 animate-pulse" />
                  <div className="h-3 w-12 rounded bg-white/5 animate-pulse" />
                  <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  )
}
