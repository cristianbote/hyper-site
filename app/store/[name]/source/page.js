import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/source.module.css'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return plugins.map(({ name }) => ({
    name,
  }))
}

export async function generateMetadata({ params }) {
  const plugin = plugins.find((e) => e.name === params.name)
  
  if (!plugin) {
    return {
      title: 'Plugin Not Found',
    }
  }
  
  return {
    title: `${plugin.name} - Source`,
    description: `View the source code for ${plugin.name}`,
  }
}

async function getNpmData(name) {
  try {
    const res = await fetch(`https://api.npms.io/v2/package/${name}`, {
      next: { revalidate: 60 * 60 * 24 }
    })
    return res.json()
  } catch (error) {
    return null
  }
}

export default async function StoreSourcePage({ params }) {
  const plugin = plugins.find((e) => e.name === params.name)
  
  if (!plugin) {
    notFound()
  }

  const npmData = await getNpmData(params.name)

  return (
    <Page
      title={`Hyper™ Store - ${plugin.name} - Source`}
      description={`View the source code for ${plugin.name}`}
    >
      <div className={styles.root}>
        <h1 className={styles.name}>{plugin.name}</h1>
        <PluginInfo variant="source" npmData={npmData} />
      </div>
    </Page>
  )
}
