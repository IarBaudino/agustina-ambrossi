import { notFound } from "next/navigation"
import { Suspense } from "react"
import { AssetUploader } from "@/components/admin/AssetUploader"
import { findSettingsSection } from "@/components/admin/settingsSections"
import { SettingsForm } from "@/components/admin/SettingsForm"
import { requireAdmin } from "@/lib/auth"
import { getAdminSettings } from "@/lib/data/admin"

type RouteParams = { section: string }

export default function SettingsSectionPage({ params }: { params: Promise<RouteParams> }) {
  return (
    <Suspense fallback={<p className="text-sm text-mute">Abriendo la configuración…</p>}>
      <SettingsContent params={params} />
    </Suspense>
  )
}

async function SettingsContent({ params }: { params: Promise<RouteParams> }) {
  const { section: sectionId } = await params
  const section = findSettingsSection(sectionId)

  if (!section) {
    notFound()
  }

  const { supabase } = await requireAdmin()
  const settings = await getAdminSettings(supabase)

  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-[0.18em] text-mute">Configuración</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">{section.label}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-mute">{section.description}</p>
      <div className="mt-10">
        <SettingsForm section={section.id} settings={settings}>
          {section.id === "imagenes" ? (
            <>
              <AssetUploader
                kind="portrait"
                label="Retrato"
                description="La foto de Sobre mí. Si no hay retrato, esa página deja el espacio vacío."
                url={settings.portraitUrl}
                width={settings.portraitWidth}
                height={settings.portraitHeight}
                bytes={settings.portraitBytes}
              />
              <AssetUploader
                kind="featured"
                label="Imagen para compartir"
                description="La imagen que aparece cuando alguien comparte el enlace del sitio, por ejemplo en WhatsApp. No es la foto del inicio ni la portada de una categoría."
                url={settings.featuredImageUrl}
                width={settings.featuredWidth}
                height={settings.featuredHeight}
                bytes={settings.featuredBytes}
              />
            </>
          ) : null}
        </SettingsForm>
      </div>
    </div>
  )
}
