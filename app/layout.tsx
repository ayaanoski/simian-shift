import './globals.css'
import { Toaster } from './components/ui/toaster'

export const metadata = {
  title: 'Simian Shift',
  description: 'Gamified productivity platform inspired by Sun Wukong',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <div className="mythological-bg fixed inset-0 z-[-1]"></div>
        <div className="content-wrapper">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}

