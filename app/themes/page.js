import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

export const metadata = {
  title: 'Themes',
  description: 'Discover and install themes for Hyper terminal',
}

export default function ThemeIndexPage() {
  const themes = allPlugins
    .filter((p) => p.type === 'theme' && p.featured === true)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return <PluginThemeShowcase plugins={themes} variant="theme" />
}
