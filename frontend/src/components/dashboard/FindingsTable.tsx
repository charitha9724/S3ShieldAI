import { useState } from 'react'
import { findings as demoFindings } from '../../data/mockSecurityData'
import { getAnalysis } from '../../data/analysisData'
import type { Severity } from '../../types/security'

const filters = [
  'All',
  'Critical',
  'High',
  'Medium',
  'Low',
]

const colors: Record<Severity, string> = {
  Critical:
    'bg-rose-400/10 text-rose-300 border border-rose-400/20',
  High:
    'bg-orange-400/10 text-orange-300 border border-orange-400/20',
  Medium:
    'bg-yellow-400/10 text-yellow-300 border border-yellow-400/20',
  Passed:
    'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20',
}

export default function FindingsTable() {
  const analysis = getAnalysis()

  const backendFindings =
  analysis?.findings?.map((finding: any, index: number) => {

    const remediation = analysis?.remediations?.find(
      (r: any) => r.rule_id === finding.rule_id
    )

    const status =
      remediation?.title === 'Manual Review Required'
        ? 'Manual Review'
        : 'Remediated'

    return {
      id: String(index + 1),
      rule: finding.rule_id,
      severity:
        finding.severity.charAt(0).toUpperCase() +
        finding.severity.slice(1).toLowerCase(),
      description: finding.description,
      status,
    }
  }) ?? demoFindings

  const [filter, setFilter] =
    useState<(typeof filters)[number]>('All')

  const items =
    filter === 'All'
      ? backendFindings
      : backendFindings.filter(
          (item: any) => item.severity === filter
        )

  return (
    <section className="h-full rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Policy Findings
          </h2>

          <p className="mt-1 text-sm text-slate-300">
            Review detected security risks and recommended actions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-all duration-300 ${
                filter === item
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/25'
                  : 'border border-white/10 bg-slate-900/40 text-slate-300 hover:border-cyan-400/30 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">

        <table className="w-full min-w-[700px] text-left text-sm">

          <thead className="sticky top-0 bg-slate-900/60 backdrop-blur-md">

            <tr className="border-b border-white/10">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rule
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Severity
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Description
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {items.map((item: any) => (
              <tr
                key={item.id}
                className="border-b border-white/10 transition-colors duration-200 hover:bg-white/5 last:border-0"
              >
                <td className="px-5 py-5 font-medium text-white">
                  {item.rule}
                </td>

                <td className="px-5 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      colors[item.severity as Severity]
                    }`}
                  >
                    {item.severity}
                  </span>
                </td>

                <td className="max-w-[420px] px-5 py-5 leading-6 text-slate-300">
                  {item.description}
                </td>

                <td className="px-5 py-5 text-slate-200">
                  {item.status}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  )
}