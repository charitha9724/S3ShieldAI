import { ArrowRight } from 'lucide-react'
import Button from '../Common/Button'
import Container from '../Common/Container'

export default function Cta() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(8,145,178,.18),rgba(30,64,175,.14))] px-6 py-14 text-center shadow-2xl shadow-cyan-900/10 backdrop-blur-xl sm:px-12">

          {/* Decorative glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,.12),transparent_60%)]" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[.15em] text-cyan-300">
              S3 security, simplified
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              Make every bucket policy easier to trust.
            </h2>

            <p
              className="mx-auto mt-5 max-w-xl text-slate-200 leading-7"
              style={{
                textShadow: "0 1px 8px rgba(0,0,0,0.20)",
              }}
            >
              Start with a policy, then get a clear view of its risks and the
              path to remediation.
            </p>

            <Button
              to="/analyze"
              className="mt-8 px-6 py-3.5"
            >
              Analyze Your Policy
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}