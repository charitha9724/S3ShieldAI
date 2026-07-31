import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { getAnalysis } from '../../data/analysisData'

export default function PostureScore() {
  const analysis = getAnalysis()

  const score = analysis?.risk_score ?? 87
  const riskLevel = analysis?.risk_level ?? 'Medium'

  const radius = 105
  const circumference = 2 * Math.PI * radius

  // Calculate how much of the circle should be filled
  const progress = Math.max(0, Math.min(score, 100))
  const strokeDashoffset =
    circumference * (1 - progress / 100)

  // Badge color based on risk level
  const badgeStyle = (() => {
    switch (riskLevel.toLowerCase()) {
      case 'critical':
        return 'border-red-400/20 bg-red-400/10 text-red-300'

      case 'high':
        return 'border-orange-400/20 bg-orange-400/10 text-orange-300'

      case 'medium':
        return 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300'

      case 'low':
        return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'

      default:
        return 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
    }
  })()

  return (
    <section className="group rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyan-500/10">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-semibold text-white">
            Security Score
          </h2>

          <p className="mt-1 text-lg text-slate-400">
            Overall Security Posture
          </p>
        </div>

        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20 transition-all duration-300 group-hover:scale-110">
          <ShieldCheck size={30} />
        </div>

      </div>

      {/* Gauge */}
      <div className="relative mt-10 flex justify-center">

        <div className="absolute h-80 w-80 rounded-full bg-cyan-400/10 blur-[90px]" />

        <div className="absolute h-96 w-96 rounded-full border border-white/5" />

        <svg
          width="300"
          height="300"
          className="-rotate-90"
        >
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="18"
          />

          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference,
            }}
            animate={{
              strokeDashoffset,
            }}
            transition={{
              duration: 1.3,
              ease: 'easeOut',
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-3">

          <div className="flex items-end">

            <span
              className="text-8xl font-bold leading-none text-white"
              style={{
                textShadow: '0 2px 15px rgba(0,0,0,.3)',
              }}
            >
              {score}
            </span>

            <span className="mb-3 ml-2 text-3xl font-medium text-slate-300">
              /100
            </span>

          </div>

          <span
            className={`mt-4 rounded-full px-5 py-2 text-lg font-semibold border ${badgeStyle}`}
          >
            {riskLevel} Risk
          </span>

        </div>

      </div>

    </section>
  )
}