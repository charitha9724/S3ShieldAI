import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import Button from '../Common/Button'
import Container from '../Common/Container'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,.12),transparent_30%),radial-gradient(circle_at_82%_45%,rgba(37,99,235,.12),transparent_26%)]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
        >

          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/8 px-3 py-1.5 text-sm font-medium text-cyan-200">
            <Sparkles size={15} />
            Intelligent S3 policy security
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Secure AWS S3 Bucket Policies{' '}
            <span className="text-cyan-300">with AI</span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-200"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.25)" }}
          >
            Detect risks, retrieve the right security knowledge, and generate
            policy remediation with an AI assistant built for AWS S3.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/analyze" className="px-5 py-3.5">
              Analyze Policy
              <ArrowRight size={18} />
            </Button>

            <Button
              to="/dashboard"
              variant="secondary"
              className="px-5 py-3.5"
            >
              View Demo
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
            {[
              'AI risk analysis',
              'RAG knowledge retrieval',
              'Secure remediation',
            ].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-300" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}