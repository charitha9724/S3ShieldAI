import {
  BrainCircuit,
  ClipboardCheck,
  DatabaseZap,
  Gauge,
  ShieldCheck,
  WandSparkles,
} from 'lucide-react'

import Container from '../Common/Container'
import SectionHeading from '../Common/SectionHeading'

const features = [
  {
    title: 'AI Risk Analysis',
    copy: 'Identify risky access patterns and understand their impact instantly.',
    icon: BrainCircuit,
  },
  {
    title: 'RAG Knowledge Base',
    copy: 'Ground insights in curated AWS security guidance and best practices.',
    icon: DatabaseZap,
  },
  {
    title: 'Automatic Remediation',
    copy: 'Generate safer, precisely scoped policy alternatives.',
    icon: WandSparkles,
  },
  {
    title: 'Risk Scoring',
    copy: 'Prioritize attention with an easy-to-understand security posture score.',
    icon: Gauge,
  },
  {
    title: 'Compliance Insights',
    copy: 'See the control gaps affecting your policy compliance posture.',
    icon: ClipboardCheck,
  },
  {
    title: 'Secure Recommendations',
    copy: 'Move forward with practical next steps your team can trust.',
    icon: ShieldCheck,
  },
]

export default function Features() {
  return (
    <section
      id="platform"
      className="border-y border-white/10 bg-[#121827]/20 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Security intelligence"
          title="Everything you need to harden S3 access."
          copy="A purpose-built workspace for understanding bucket policies and improving them with confidence."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-[#121827]/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20">
                  <Icon size={21} />
                </span>

                <h3 className="mt-5 font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {feature.copy}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}