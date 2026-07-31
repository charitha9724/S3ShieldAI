import { ShieldCheck } from 'lucide-react'
import Container from '../Common/Container'

export default function Footer() {
  return (
    <footer
      id="security"
      className="border-t border-white/10 bg-[#0A0E1A]/40 backdrop-blur-xl py-10"
    >
      <Container className="flex flex-col justify-between gap-5 text-sm sm:flex-row sm:items-center">

        <p className="flex items-center gap-2 font-semibold text-white">
          <span className="grid size-8 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
            <ShieldCheck size={17} />
          </span>

          S3Shield<span className="text-cyan-300">AI</span>
        </p>

        <p className="text-slate-200">
          AI-powered security intelligence for AWS S3.
        </p>

        <p className="text-slate-300">
          © {new Date().getFullYear()} S3ShieldAI
        </p>

      </Container>
    </footer>
  )
}