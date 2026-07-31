import {
  BrainCircuit,
  FileUp,
  FileWarning,
  KeyRound,
  ShieldCheck,
  WandSparkles,
} from 'lucide-react'

import Container from '../Common/Container'
import SectionHeading from '../Common/SectionHeading'

const steps = [
  { label: 'Upload Policy', icon: FileUp },
  { label: 'AI Analysis', icon: BrainCircuit },
  { label: 'Risk Detection', icon: FileWarning },
  { label: 'Knowledge Retrieval', icon: KeyRound },
  { label: 'Automatic Remediation', icon: WandSparkles },
  { label: 'Secure Policy Generated', icon: ShieldCheck },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From policy to protection, clearly."
          copy="A focused analysis workflow that turns policy complexity into prioritized, actionable security guidance."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.label}
                className="group relative rounded-2xl border border-white/10 bg-[#121827]/55 p-5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <span className="mx-auto grid size-11 place-items-center rounded-xl bg-blue-400/10 text-blue-300 ring-1 ring-blue-400/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20 group-hover:text-cyan-300">
                  <Icon size={20} />
                </span>

                <p className="mt-4 text-sm font-semibold text-white">
                  {step.label}
                </p>

                {index < steps.length - 1 && (
                  <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-cyan-400/80 lg:block">
                    →
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}