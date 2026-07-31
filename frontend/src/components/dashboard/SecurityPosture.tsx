import { ShieldCheck } from 'lucide-react'
import { getAnalysis } from '../../data/analysisData'

export default function SecurityPosture() {
  const analysis = getAnalysis()

  const findings = analysis?.findings ?? []

  const hasFinding = (ruleId: string) =>
    findings.some((f: any) => f.rule_id === ruleId)

  const checks = [
    {
      label: 'HTTPS Protection',
      status: hasFinding('S3-009') ? 'At Risk' : 'Secure',
    },
    {
      label: 'Public Access',
      status: hasFinding('S3-001') ? 'At Risk' : 'Secure',
    },
    {
      label: 'Least Privilege',
      status:
        hasFinding('S3-002') || hasFinding('S3-003')
          ? 'Needs Review'
          : 'Secure',
    },
    {
      label: 'Policy Hygiene',
      status:
        hasFinding('S3-012') || hasFinding('S3-013')
          ? 'Needs Review'
          : 'Secure',
    },
    {
      label: 'Identity Security',
      status: hasFinding('S3-014')
        ? 'Needs Review'
        : 'Secure',
    },
  ]

  const badge = (status: string) => {
    switch (status) {
      case 'Secure':
        return 'bg-emerald-500/15 text-emerald-300'
      case 'Needs Review':
        return 'bg-amber-500/15 text-amber-300'
      default:
        return 'bg-red-500/15 text-red-300'
    }
  }

  const riskCount = checks.filter(c => c.status === 'At Risk').length
  const reviewCount = checks.filter(c => c.status === 'Needs Review').length

  const overallStatus =
    riskCount > 0
      ? 'At Risk'
      : reviewCount > 0
        ? 'Needs Review'
        : 'Secure'

  const strengths = checks.filter(c => c.status === 'Secure')

  const attentionAreas = checks.filter(
    c => c.status === 'Needs Review' || c.status === 'At Risk'
  )

  return (
    <section className="rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl min-h-[500px]">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
          <ShieldCheck size={18} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Security Posture
          </h2>

          <p className="text-sm text-slate-300">
            Security health at a glance
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">

        <p className="text-xs uppercase tracking-wider text-slate-400">
          Overall Status
        </p>

        <div
          className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${badge(
            overallStatus
          )}`}
        >
          {overallStatus}
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">

          <div className="grid gap-4 md:grid-cols-2">

            {/* Strengths */}
            <div className="rounded-xl border border-emerald-400/15 bg-emerald-500/5 p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Strengths
              </p>

              <div className="mt-4 space-y-3">
                {strengths.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3"
                  >
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                      ✓
                    </div>

                    <span className="text-sm text-slate-200">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Needs Attention */}
            <div className="rounded-xl border border-amber-400/15 bg-amber-500/5 p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Needs Attention
              </p>

              <div className="mt-4 space-y-3">
                {attentionAreas.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`grid h-6 w-6 place-items-center rounded-full ${
                        item.status === 'At Risk'
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {item.status === 'At Risk' ? '✕' : '⚠'}
                    </div>

                    <span className="text-sm text-slate-200">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}