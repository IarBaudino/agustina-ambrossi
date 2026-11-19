"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { logout } from "@/lib/actions/auth"
import { settingsSections } from "@/components/admin/settingsSections"

const links = [
  { href: "/admin/dashboard", label: "Panel" },
  { href: "/admin/series", label: "Categorías" },
]

function itemClass(active: boolean) {
  return active ? "text-sm" : "text-sm text-mute"
}

export function AdminNav({ email }: { email: string | null }) {
  const pathname = usePathname()
  const inSettings = pathname.startsWith("/admin/configuracion")

  return (
    <>
      <div className="flex items-center justify-between border-b border-line px-5 py-4 md:hidden">
        <Link href="/admin/dashboard" className="text-[0.72rem] uppercase tracking-[0.18em]">
          Estudio
        </Link>
        <details>
          <summary className="cursor-pointer text-[0.72rem] uppercase tracking-[0.16em]">Menú</summary>
          <div className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm">
                {link.label}
              </Link>
            ))}
            <p className="text-sm">Configuración</p>
            {settingsSections.map((section) => (
              <Link key={section.href} href={section.href} className="pl-3 text-sm text-mute">
                {section.label}
              </Link>
            ))}
            <Link href="/" className="text-sm text-mute">
              Ver sitio
            </Link>
            <form action={logout}>
              <button type="submit" className="text-sm">
                Cerrar sesión
              </button>
            </form>
          </div>
        </details>
      </div>
      <aside className="hidden w-60 shrink-0 border-r border-line md:flex md:min-h-screen md:flex-col md:justify-between md:px-6 md:py-8">
        <div>
          <Link href="/admin/dashboard" className="text-[0.72rem] uppercase tracking-[0.2em]">
            Estudio
          </Link>
          <nav className="mt-10 flex flex-col gap-3" aria-label="Estudio">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={itemClass(active)}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="flex flex-col gap-2">
              <p className={inSettings ? "text-sm" : "text-sm text-mute"}>Configuración</p>
              <div className="flex flex-col gap-2 border-l border-line pl-3">
                {settingsSections.map((section) => {
                  const active = pathname === section.href
                  return (
                    <Link
                      key={section.href}
                      href={section.href}
                      aria-current={active ? "page" : undefined}
                      className={active ? "text-sm" : "text-sm text-mute"}
                    >
                      {section.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          {email ? <p className="break-all text-mute">{email}</p> : null}
          <Link href="/" className="underline decoration-line underline-offset-4">
            Ver sitio
          </Link>
          <form action={logout}>
            <button type="submit" className="underline decoration-line underline-offset-4">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
