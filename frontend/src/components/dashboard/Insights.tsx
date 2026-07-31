import { BookOpenCheck, Sparkles } from 'lucide-react'
import { getAnalysis } from '../../data/analysisData'
import ReactMarkdown from 'react-markdown'

const CARD_HEIGHT = 'h-[430px]'

export function AiSummary() {
  const analysis = getAnalysis()

  const summary =
    analysis?.summary ??
    `The policy permits unauthenticated object reads, creating a direct
public-data exposure path for the production-assets bucket.

Two medium-priority controls should also be addressed: enforce TLS
and reduce permissions to only the application identities that
require them.`

  const recommendation =
    analysis?.remediations?.[0]?.description ??
    'Replace the wildcard principal and add an explicit deny condition for insecure transport.'

  return (
    <section
      className={`${CARD_HEIGHT} overflow-y-auto rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl`}
    >
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
          <Sparkles size={18} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Security Summary
          </h2>

          <p className="text-sm text-slate-300">
            AI-generated analysis of the uploaded policy
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5 text-sm leading-7 text-slate-200">
        <div className="prose prose-invert max-w-none text-sm">
          <ReactMarkdown>
            {summary}
          </ReactMarkdown>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
          <p className="font-semibold text-cyan-100">
            Recommended Next Step
          </p>

          <p className="mt-2 leading-6 text-slate-200">
            {recommendation}
          </p>
        </div>
      </div>
    </section>
  )
}

export function KnowledgeBase() {
  const analysis = getAnalysis()

  const knowledge =
    analysis?.findings?.find((f: any) => f.knowledge)?.knowledge

  return (
    <section
      className={`${CARD_HEIGHT} flex flex-col rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl`}
    >
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-blue-400/10 text-blue-300 ring-1 ring-blue-400/20">
          <BookOpenCheck size={18} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            RAG Knowledge Base
          </h2>

          <p className="text-sm text-slate-300">
            Retrieved AWS security guidance
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col">

        <h3 className="text-base font-semibold text-white">
          {knowledge?.title ?? 'Avoid Public Read Access'}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-200">
          {knowledge?.description ??
            'A wildcard principal makes objects available to any requester unless constrained by a condition.'}
        </p>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Why Dangerous
          </p>

          <p className="mt-2 text-sm leading-7 text-slate-300">
            {knowledge?.real_world_impact ??
              'It can unintentionally expose sensitive assets and greatly increases the blast radius of a policy misconfiguration.'}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
            AWS Recommendation
          </p>

          <p className="mt-2 text-sm leading-7 text-slate-300">
            {knowledge?.aws_recommendation ??
              'Grant access only to explicit IAM roles and require aws:SecureTransport.'}
          </p>
        </div>

        <a
          href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html"
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center font-medium text-cyan-300 transition-colors hover:text-cyan-200"
        >
          AWS S3 Security Best Practices →
        </a>

      </div>
    </section>
  )
}