import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  FileJson,
  FolderUp,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Button from '../Common/Button'
import toast from 'react-hot-toast'

const steps = [
  'Uploading',
  'Parsing Policy',
  'AI Risk Analysis',
  'Retrieving Knowledge',
  'Generating Remediation',
]

export default function UploadExperience() {
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(-1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!started) return

    if (active === steps.length - 1) {
      const timer = window.setTimeout(() => {
        navigate('/dashboard')
      }, 900)

      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setActive((current) => current + 1)
    }, 650)

    return () => window.clearTimeout(timer)
  }, [active, navigate, started])

  const start = async () => {
    if (!selectedFile) {
      toast.error('Please select a JSON policy before starting the analysis.')
      return
    }
    if (selectedFile.size === 0) {
      toast.error('The selected file is empty.')
      return
    }

    if (
      selectedFile.type !== 'application/json' &&
      !selectedFile.name.toLowerCase().endsWith('.json')
    ) {
      toast.error('Please upload a valid JSON file.')
      return
    }
    setStarted(true)
    setActive(0)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await api.post(
        '/upload-policy',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      sessionStorage.setItem(
        'analysis',
        JSON.stringify(response.data)
      )
    } catch (error: any) {
        console.error(error)

        if (!error.response) {
          toast.error(
            'Unable to connect to the server. Please check your connection or try again later.'
          )
        } else if (error.response.status === 400) {
          toast.error('Invalid policy. Please upload a valid S3 bucket policy.')
        } else if (error.response.status === 422) {
          toast.error('Please upload a valid JSON policy file.')
        } else if (error.response.status >= 500) {
          toast.error('Server error occurred while analyzing the policy.')
        } else {
          toast.error('Policy analysis failed. Please try again.')
        }

        setStarted(false)
        setActive(-1)
      }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">

      {/* Upload Card */}
      <section className="rounded-3xl border border-white/10 bg-[#121827]/55 p-6 backdrop-blur-xl shadow-xl">

        <div className="flex items-start gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
            <FileJson size={22} />
          </span>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Analyze an S3 bucket policy
            </h2>

            <p className="mt-1 text-sm text-slate-200">
              Upload your own S3 bucket policy for AI-powered analysis.
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={(e) => {
            if (e.target.files?.length) {
              setSelectedFile(e.target.files[0])
            }
          }}
        />

        <button
          type="button"
          disabled={started}
          onClick={() => fileInputRef.current?.click()}
          className="group mt-7 flex min-h-72 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-600 bg-slate-950/25 px-6 text-center transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/5 hover:shadow-xl hover:shadow-cyan-500/10 disabled:cursor-default"
        >
          <span className="grid size-16 place-items-center rounded-2xl bg-blue-400/10 text-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20 group-hover:text-cyan-300">
            <FolderUp size={30} />
          </span>

          <p className="mt-5 text-lg font-semibold text-white">
            {selectedFile
              ? selectedFile.name
              : 'Drop your policy JSON here'}
          </p>

          <p className="mt-2 text-sm text-slate-200">
            or click to choose a file
          </p>

          <span className="mt-6 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
            JSON bucket policies only
          </span>
        </button>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-300">
            {selectedFile
              ? 'Ready to analyze your uploaded policy.'
              : 'Select a JSON policy to begin.'}
          </p>

          <Button
            onClick={start}
            disabled={started}
          >
            {started
              ? 'Analysis in Progress'
              : 'Start Analysis'}

            {!started && <ShieldCheck size={17} />}
          </Button>
        </div>
      </section>
            {/* Status Card */}
      <aside className="rounded-3xl border border-white/10 bg-[#121827]/50 p-6 backdrop-blur-xl shadow-xl">

        <p className="text-sm font-semibold text-white">
          Analysis Status
        </p>

        <p className="mt-1 text-sm text-slate-200">
          Follow the AI security analysis workflow.
        </p>

        <div className="mt-6 space-y-5">
          {steps.map((step, index) => {
            const done = active > index
            const current = active === index

            return (
              <div
                key={step}
                className="flex items-center gap-3"
              >
                <span
                  className={`grid size-8 place-items-center rounded-full ${
                    done
                      ? 'bg-emerald-400/10 text-emerald-300'
                      : current
                      ? 'bg-cyan-400/10 text-cyan-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 size={17} />
                  ) : current ? (
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </span>

                <span
                  className={
                    done || current
                      ? 'text-sm font-medium text-white'
                      : 'text-sm text-slate-300'
                  }
                >
                  {step}
                </span>
              </div>
            )
          })}
        </div>

        <AnimatePresence>
          {started && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-7 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100"
            >
              AI is building your policy security report...
            </motion.div>
          )}
        </AnimatePresence>

      </aside>
    </div>
  )
}