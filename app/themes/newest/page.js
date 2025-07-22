import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

export const metadata = {
  title: 'Newest Themes',
  description: 'Discover the newest themes for Hyper terminal',
}

export default function NewestThemesPage() {
  const themes = allPlugins
    .filter((p) => p.type === 'theme')
    .sort((a, b) => b.dateAdded - a.dateAdded)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return <PluginThemeShowcase plugins={themes} variant="theme" />
}
