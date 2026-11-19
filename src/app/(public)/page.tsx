import { Suspense } from "react"
import { connection } from "next/server"
import { PhotoViewer } from "@/components/public/PhotoViewer"
import { getHomeSelection } from "@/lib/data/public"

export default function HomePage() {
  return (
    <Suspense fallback={<p className="px-5 py-20 text-sm text-mute md:px-10">Cargando…</p>}>
      <HomeContent />
    </Suspense>
  )
}

async function HomeContent() {
  await connection()
  const photos = await getHomeSelection()

  return (
    <div className="px-5 md:px-10 lg:px-11">
      <header className="border-b border-line pb-12 pt-14 md:pb-[50px] md:pt-16">
        <h1 className="font-serif text-[clamp(3.25rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.045em]">
          Portfolio
        </h1>
      </header>
      <div className="py-12 lg:py-16">
        {photos.length === 0 ? (
          <p className="max-w-md text-lg leading-8 text-mute">
            La selección del inicio se elige desde el estudio.
          </p>
        ) : (
          <PhotoViewer photos={photos} variant="masonry" />
        )}
      </div>
    </div>
  )
}
