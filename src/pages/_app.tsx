import Layout from '@/components/layout'
 
import { AppProps } from 'next/app';

export default function Pages({ Component, pageProps }: AppProps) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}