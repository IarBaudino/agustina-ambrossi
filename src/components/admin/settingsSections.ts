export const settingsSections = [
  {
    id: "textos",
    href: "/admin/configuracion/textos",
    label: "Nombre y textos",
    description: "El nombre, la profesión y los textos que se leen en Sobre mí.",
  },
  {
    id: "contacto",
    href: "/admin/configuracion/contacto",
    label: "Contacto",
    description: "El correo, Instagram y los otros enlaces del pie y de Contacto.",
  },
  {
    id: "colores",
    href: "/admin/configuracion/colores",
    label: "Colores",
    description: "Los colores del sitio público y del estudio.",
  },
  {
    id: "imagenes",
    href: "/admin/configuracion/imagenes",
    label: "Imágenes",
    description: "El retrato de Sobre mí y la imagen que aparece al compartir el sitio.",
  },
  {
    id: "buscadores",
    href: "/admin/configuracion/buscadores",
    label: "Buscadores",
    description: "El título y la descripción que puede mostrar Google.",
  },
] as const

export type SettingsSectionId = (typeof settingsSections)[number]["id"]

export function findSettingsSection(id: string) {
  return settingsSections.find((section) => section.id === id) ?? null
}
