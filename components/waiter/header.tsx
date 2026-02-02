"use client"

import { Flame, LayoutGrid } from "lucide-react"

export function WaiterHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Smash<span className="text-primary">Bar</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
          <LayoutGrid className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Panel Mozo</span>
        </div>
      </div>
    </header>
  )
}
