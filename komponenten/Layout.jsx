import Head from 'next/head'
import { Inter } from 'next/font/google'

import Fusszeile from '../komponenten/Fusszeile'
import Seitenbegrenzung from './Seitenbegrenzung'
import { Children } from 'react'
import { AuthProvider } from '@/pages/Providers'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  return (
    <div>
      <Head>
        <title>xilef</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navigation /> */}
      <div>
        <AuthProvider>
        {children}
        </AuthProvider>
        </div>

      <Fusszeile />
      <Seitenbegrenzung/>
    </div>
  )
}