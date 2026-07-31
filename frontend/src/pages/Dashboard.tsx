import { Toaster } from 'react-hot-toast'
import PolicyStatistics from '../components/dashboard/PolicyStatistics'
import Container from '../components/Common/Container'
import PageMotion from '../components/Common/PageMotion'
import SecurityPosture from '../components/dashboard/SecurityPosture'
import FindingsTable from '../components/dashboard/FindingsTable'
import { AiSummary, KnowledgeBase } from '../components/dashboard/Insights'
import PolicyComparison from '../components/dashboard/PolicyComparison'
import PostureScore from '../components/dashboard/PostureScore'
import Remediation from '../components/dashboard/Remediation'
import RiskCharts from '../components/dashboard/RiskCharts'
import RiskSummary from '../components/dashboard/RiskSummary'

import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

export default function Dashboard() {
  return (
    <PageMotion>
      <main className="min-h-screen">
        <Navbar />

        <Container className="py-10 sm:py-14">

          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[.15em] text-cyan-300">
                Security Workspace
              </p>

              <h1
                className="mt-2 text-3xl font-bold text-white sm:text-4xl"
                style={{
                  textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                }}
              >
                S3 Policy Security Dashboard
              </h1>

              <p
                className="mt-3 text-slate-200"
                style={{
                  textShadow: "0 1px 8px rgba(0,0,0,0.18)",
                }}
              >
                production-assets · Mock security analysis report
              </p>
            </div>

            <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10">
              ✓ Analysis Complete
            </span>

          </div>

          {/* Score Cards */}
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <PostureScore />
            <RiskSummary />
          </div>

          {/* AI Insights */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <AiSummary />
            <KnowledgeBase />
          </div>

          {/* Findings */}
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_.55fr]">

            <div className="flex flex-col gap-4">

              <div className="flex-1">
                <FindingsTable />
              </div>

              <SecurityPosture />

            </div>

            <div className="flex flex-col gap-4">

              <div className="flex-1">
                <Remediation />
              </div>

              <RiskCharts />

            </div>

          </div>

          {/* Policy Statistics + Policy Comparison */}
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_.55fr]">

            <PolicyComparison />

            <PolicyStatistics />

          </div>

        </Container>

        <Footer />

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(18,24,39,0.9)',
              color: '#e2e8f0',
              border: '1px solid rgba(34,211,238,0.15)',
              backdropFilter: 'blur(18px)',
              borderRadius: '16px',
            },
          }}
        />
      </main>
    </PageMotion>
  )
}