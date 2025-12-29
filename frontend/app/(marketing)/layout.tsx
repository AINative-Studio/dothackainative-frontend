import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code2 } from 'lucide-react'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-1.5 rounded-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              DotHack
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                Docs
              </Link>
              <Link href="/contact" className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                Contact
              </Link>
            </nav>
            <Link href="/hackathons">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40">
                Open App
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-3">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-1.5 rounded-lg">
                  <Code2 className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  DotHack
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Complete hackathon management platform
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-slate-200">Product</h3>
              <div className="space-y-2">
                <Link href="/features" className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/docs" className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-slate-200">Company</h3>
              <div className="space-y-2">
                <Link href="/contact" className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-slate-200">Legal</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
            © 2024 DotHack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
