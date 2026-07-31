import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../Common/Button'
import Container from '../Common/Container'

const nav = [
  { label: 'Platform', href: '/#platform' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Security', href: '/#security' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0E1A]/55 backdrop-blur-2xl shadow-lg shadow-black/10">
      <Container className="flex h-[72px] items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-all duration-300 hover:scale-[1.02]"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
            <ShieldCheck size={21} />
          </span>

          S3Shield
          <span className="text-cyan-300">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-100 transition-all duration-200 hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}

          <NavLink
            to="/dashboard"
            className="text-sm font-medium text-slate-100 transition-all duration-200 hover:text-cyan-300"
          >
            Dashboard
          </NavLink>

          <Button to="/analyze" className="px-4 py-2">
            Analyze Policy
          </Button>
        </nav>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="grid size-10 place-items-center rounded-lg border border-slate-700/80 text-slate-100 transition-colors hover:bg-white/5 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-[#0A0E1A]/75 backdrop-blur-2xl md:hidden"
          >
            <Container className="flex flex-col gap-1 py-3">

              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-100 transition-colors hover:bg-white/5 hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}

              <Link
                to="/dashboard"
                onClick={close}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-100 transition-colors hover:bg-white/5 hover:text-cyan-300"
              >
                Dashboard
              </Link>

              <Button
                to="/analyze"
                onClick={close}
                className="mt-2"
              >
                Analyze Policy
              </Button>

            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}