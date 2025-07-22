import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/index.module.css'
import { getPluginPreviewImage } from 'lib/plugin'
import Image from 'next/image'
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

  const preview = getPluginPreviewImage(params.name)
  
  return {
    title: `${plugin.name}`,
    description: plugin.description,
    openGraph: {
      title: `Hyper™ Store - ${plugin.name}`,
      description: plugin.description,
      images: preview ? [preview.src] : undefined,
    },
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

export default async function StoreIndexPage({ params }) {
  const plugin = plugins.find((e) => e.name === params.name)
  
  if (!plugin) {
    notFound()
  }

  const npmData = await getNpmData(params.name)
  const pluginWithPreview = {
    ...plugin,
    preview: getPluginPreviewImage(params.name),
  }

  return (
    <Page
      title={`Hyper™ Store - ${plugin.name}`}
      description={plugin.description}
      image={pluginWithPreview.preview?.src}
    >
      <div className={styles.root}>
        <h1 className={styles.name}>{plugin.name}</h1>
        <p>{plugin.description}</p>
        <div className={styles.imageContainer}>
          {pluginWithPreview.preview && (
            <>
              {pluginWithPreview.preview.isGIF ? (
                <img
                  src={pluginWithPreview.preview.src}
                  alt={`${plugin.name}'s preview image`}
                  width={pluginWithPreview.preview.width}
                  height={pluginWithPreview.preview.height}
                  className={styles.image}
                />
              ) : (
                <Image
                  width={pluginWithPreview.preview.width}
                  height={pluginWithPreview.preview.height}
                  src={pluginWithPreview.preview.src}
                  alt={`${plugin.name}'s preview image`}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </>
          )}
        </div>
        <PluginInfo variant="description" npmData={npmData} />
      </div>
    </Page>
  )
}
