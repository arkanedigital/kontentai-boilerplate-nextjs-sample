import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '../Components/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Head>
        <title>Kontent.ai Next.js boilerplate</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    </Layout>
  )
}

