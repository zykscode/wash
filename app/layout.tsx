import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

import { Analytics } from '@/components/analytics';
import { Icons } from '@/components/icons';
import MainNav from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { homepageNavs } from '@/config/homepage';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
  ],
  authors: [
    {
      name: 'shadcn',
      url: 'https:shadcn.com',
    },
  ],
  creator: 'shadcn',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@shadcn',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  const navKey = homepageNavs.mainNav.map((item) => item.title).join();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-primary font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="header sticky left-0 top-0 z-40 h-[var(--header-height)] min-h-[var(--header-height)] w-full max-w-full overflow-hidden bg-background_co backdrop-blur-[16px] backdrop-saturate-[180%]">
              <div className="container">
                <div className="flex items-center justify-between py-6">
                  <Icons.logo className="h-6 rounded-full  md:h-8" />
                  <MainNav items={homepageNavs.mainNav} key={navKey} />
                </div>
              </div>
            </header>
            <div className="min-h-screen-[calc(100vh-var(--header-height))] relative flex grow flex-col items-center">
              {children}
            </div>

            <SiteFooter links={siteConfig.links} />
          </div>

          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
