import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { riskDistribution as demoRiskDistribution } from '../../data/mockSecurityData'
import { getAnalysis } from '../../data/analysisData'

export default function RiskCharts() {
  const analysis = getAnalysis()

  let riskDistribution = demoRiskDistribution
  let totalChecks = 12

  if (analysis?.findings) {
    const critical = analysis.findings.filter(
      (f: any) => f.severity === 'Critical'
    ).length

    const high = analysis.findings.filter(
      (f: any) => f.severity === 'High'
    ).length

    const medium = analysis.findings.filter(
      (f: any) => f.severity === 'Medium'
    ).length

    const low = analysis.findings.filter(
      (f: any) => f.severity === 'Low'
    ).length

    totalChecks = analysis.findings.length

    riskDistribution = [
      {
        name: 'Critical',
        value: critical,
        color: '#e11d48',
      },
      {
        name: 'High',
        value: high,
        color: '#f97316',
      },
      {
        name: 'Medium',
        value: medium,
        color: '#eab308',
      },
      {
        name: 'Low',
        value: low,
        color: '#10b981',
      },
    ]
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl min-h-[500px]">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Risk Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-300">
            Findings grouped by severity
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-white">
            {totalChecks}
          </p>

          <p className="text-xs text-slate-300">
            Checks Evaluated
          </p>
        </div>

      </div>

      <div className="relative mt-5 h-56">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={riskDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {riskDistribution.map((item) => (
                <Cell
                  key={item.name}
                  fill={item.color}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: 'rgba(18,24,39,.95)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: '14px',
                color: '#e2e8f0',
                backdropFilter: 'blur(14px)',
                fontSize: '12px',
              }}
              itemStyle={{
                color: '#e2e8f0',
              }}
            />

          </PieChart>

        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

          <p className="text-3xl font-bold text-white">
            {totalChecks}
          </p>

          <p className="text-xs uppercase tracking-wider text-slate-300">
            Findings
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        {riskDistribution.map((item) => (
          <div
            key={item.name}
            className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2"
          >
            <span
              className="mr-3 h-3 w-3 rounded-full"
              style={{
                background: item.color,
              }}
            />

            <span className="text-sm text-slate-200">
              {item.name}
            </span>

            <span className="ml-auto font-semibold text-white">
              {item.value}
            </span>

          </div>
        ))}

      </div>

    </section>
  )
}