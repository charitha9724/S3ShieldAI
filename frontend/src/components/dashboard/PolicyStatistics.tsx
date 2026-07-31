import { FileJson } from 'lucide-react'
import { getAnalysis } from '../../data/analysisData'

export default function PolicyStatistics() {
  const analysis = getAnalysis()

  const policy = analysis?.policy

  const statements = Array.isArray(policy?.Statement)
    ? policy.Statement
    : policy?.Statement
      ? [policy.Statement]
      : []

  const totalStatements = statements.length

  const allowStatements = statements.filter(
    (s: any) => s.Effect === 'Allow'
  ).length

  const denyStatements = statements.filter(
    (s: any) => s.Effect === 'Deny'
  ).length

  const uniquePrincipals = new Set(
    statements.map((s: any) => JSON.stringify(s.Principal))
  ).size

  const uniqueResources = new Set(
    statements.flatMap((s: any) =>
      Array.isArray(s.Resource)
        ? s.Resource
        : s.Resource
        ? [s.Resource]
        : []
    )
  ).size

  const wildcardActions = statements.filter((s: any) => {
    const actions = Array.isArray(s.Action)
      ? s.Action
      : s.Action
      ? [s.Action]
      : []

    return actions.some(
      (action: string) =>
        action === '*' || action.endsWith(':*')
    )
  }).length

  const wildcardPrincipals = statements.filter((s: any) => {
    const principal = s.Principal

    return (
      principal === '*' ||
      principal?.AWS === '*'
    )
  }).length

  const stats = [
    ['Total Statements', totalStatements],
    ['Allow Statements', allowStatements],
    ['Deny Statements', denyStatements],
    ['Unique Principals', uniquePrincipals],
    ['Unique Resources', uniqueResources],
    ['Wildcard Actions', wildcardActions],
    ['Wildcard Principals', wildcardPrincipals],
  ]

  return (
    <section className="rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl">

      <div className="flex items-center gap-3">

        <div className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
          <FileJson size={18} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Policy Statistics
          </h2>

          <p className="text-sm text-slate-300">
            Quick overview of the uploaded policy
          </p>
        </div>

      </div>

      <div className="mt-6 space-y-3">

        {stats.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="text-sm text-slate-300">
              {label}
            </span>

            <span className="font-semibold text-white">
              {value}
            </span>

          </div>
        ))}

      </div>

    </section>
  )
}