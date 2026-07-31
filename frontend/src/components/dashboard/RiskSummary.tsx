import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

import { getAnalysis } from '../../data/analysisData'

export default function RiskSummary() {
  const analysis = getAnalysis()

  let critical = 1
  let high = 1
  let medium = 2
  let low = 8

  if (analysis?.findings) {
    critical = analysis.findings.filter(
      (f: any) => f.severity === 'Critical'
    ).length

    high = analysis.findings.filter(
      (f: any) => f.severity === 'High'
    ).length

    medium = analysis.findings.filter(
      (f: any) => f.severity === 'Medium'
    ).length

    low = analysis.findings.filter(
      (f: any) => f.severity === 'Low'
    ).length
  }

  const items = [
    {
      label: 'Critical Findings',
      value: critical,
      icon: AlertOctagon,
      color:
        'text-rose-400 bg-rose-400/10 ring-1 ring-rose-400/20',
    },
    {
      label: 'High Findings',
      value: high,
      icon: AlertTriangle,
      color:
        'text-orange-400 bg-orange-400/10 ring-1 ring-orange-400/20',
    },
    {
      label: 'Medium Findings',
      value: medium,
      icon: Activity,
      color:
        'text-yellow-300 bg-yellow-300/10 ring-1 ring-yellow-300/20',
    },
    {
      label: 'Low Findings',
      value: low,
      icon: CheckCircle2,
      color:
        'text-emerald-300 bg-emerald-300/10 ring-1 ring-emerald-300/20',
    },
  ]

  return (
    <section className="rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl">

      <p className="text-sm font-semibold text-slate-200">
        Risk Summary
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">

        {items.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.label}
              className="group rounded-2xl border border-white/10 bg-slate-950/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <span
                className={`grid size-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${item.color}`}
              >
                <Icon size={18} />
              </span>

              <p className="mt-4 text-3xl font-bold text-white">
                {item.value}
              </p>

              <p className="mt-1 text-xs font-medium text-slate-300">
                {item.label}
              </p>
            </div>
          )
        })}

      </div>
    </section>
  )
}