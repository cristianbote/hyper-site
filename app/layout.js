import 'styles/global.css'
import { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import { pageView as gTagPageView } from 'lib/gtag'
import { SearchContext } from 'lib/search-context'
import { GA_TRACKING_ID } from 'lib/gtag'
import Script from 'next/script'

export const metadata = {
  title: {
    default: 'Hyper™',
    template: '%s | Hyper™',
  },
  description: 'A terminal built on web technologies',
  openGraph: {
    title: 'Hyper™',
    description: 'A terminal built on web technologies',
    url: 'https://hyper.is',
    siteName: 'Hyper™',
    images: [
      {
        url: 'https://assets.vercel.com/image/upload/v1590627842/hyper/og-image-3.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyper™',
    description: 'A terminal built on web technologies',
    site: '@vercel',
    images: ['https://assets.vercel.com/image/upload/v1590627842/hyper/og-image-3.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
    ],
  },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-TileImage': '/mstile-144x144.png',
  },
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1.0',
}

function RootLayoutClient({ children }) {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
