import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sessionprovider from '../provider/sessionProvider';
import { getServerSession } from 'next-auth';
import { GetServerSideProps } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@/components/ui/sonner';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className={inter.className}>
        <Sessionprovider session={session}>
          {children}
          <Toaster />
        </Sessionprovider>
      </body>
    </html>
  )
}
