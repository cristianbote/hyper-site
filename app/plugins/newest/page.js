import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

export const metadata = {
  title: 'Newest Plugins',
  description: 'Discover the newest plugins for Hyper terminal',
}

export default function NewestPluginsPage() {
  const plugins = allPlugins
    .filter((p) => p.type === 'plugin')
    .sort((a, b) => b.dateAdded - a.dateAdded)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return <PluginThemeShowcase plugins={plugins} variant="plugin" />
}
