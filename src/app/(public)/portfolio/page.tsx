import type { Metadata } from "next"
import { Suspense } from "react"
import { connection } from "next/server"
import { SeriesGrid } from "@/components/public/SeriesGrid"
import { getPublishedSeries } from "@/lib/data/public"

export const metadata: Metadata = {
  title: "Portfolio",
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<p className="px-5 py-20 text-sm text-mute">Cargando el trabajo…</p>}>
      <PortfolioContent />
    </Suspense>
  )
}

async function PortfolioContent() {
  await connection()
  const series = await getPublishedSeries()

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-11">
      <header className="border-b border-line pb-12 pt-14 md:pb-14 md:pt-16">
        <h1 className="font-serif text-[clamp(2.75rem,4.6vw,4.25rem)] leading-[0.98] tracking-[-0.032em]">
          Portfolio
        </h1>
      </header>
      <div className="py-12 md:py-20">
        <SeriesGrid series={series} />
      </div>
    </div>
  )
}
