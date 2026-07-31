import {
  CheckCircle2,
  CircleAlert,
  WandSparkles,
} from 'lucide-react'

import { getAnalysis } from '../../data/analysisData'

export default function Remediation() {
  const analysis = getAnalysis()

  const remediations =
    analysis?.remediations?.length > 0
      ? analysis.remediations
      : [
          {
            rule_id: 'TLS Enforcement',
            description: 'Enable secure transport for all requests.',
            status: 'Ready',
            remediated: true,
          },
          {
            rule_id: 'Least Privilege Scope',
            description: 'Reduce permissions to only required principals.',
            status: 'Ready',
            remediated: true,
          },
          {
            rule_id: 'Public Access Exception',
            description: 'Review public access manually.',
            status: 'Manual Review',
            remediated: false,
          },
        ]

  return (
    <section className="h-full rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl">

      <div className="flex items-center gap-3">

        <div className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
          <WandSparkles size={18} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Automatic Remediation
          </h2>

          <p className="text-sm text-slate-300">
            AI-generated security recommendations
          </p>
        </div>

      </div>

      <div className="mt-6 space-y-4">

        {remediations.map((item: any, index: number) => {

          const manualReview =
            item.title === 'Manual Review Required'

          const ready = !manualReview

          return (
            <div
              key={index}
              className={`group flex items-center justify-between rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 ${
                ready
                  ? 'border border-emerald-400/15 bg-emerald-400/5 hover:border-emerald-400/30'
                  : 'border border-orange-400/15 bg-orange-400/5 hover:border-orange-400/30'
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`grid size-9 place-items-center rounded-lg ${
                    ready
                      ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20'
                      : 'bg-orange-400/10 text-orange-300 ring-1 ring-orange-400/20'
                  }`}
                >
                  {ready ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <CircleAlert size={17} />
                  )}
                </div>

                <span className="text-sm font-medium text-white">
                  {item.rule_id}
                </span>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  ready
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'bg-orange-400/10 text-orange-300'
                }`}
              >
                {ready ? 'Ready' : 'Manual Review'}
              </span>

            </div>
          )
        })}

      </div>

    </section>
  )
}