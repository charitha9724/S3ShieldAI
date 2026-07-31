import { ShieldCheck } from 'lucide-react'
import Container from '../components/Common/Container'
import PageMotion from '../components/Common/PageMotion'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import UploadExperience from '../components/upload/UploadExperience'
export default function Analyze() { return <PageMotion><main className="min-h-screen"><Navbar /><Container className="py-14 sm:py-20"><div className="mx-auto max-w-3xl text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300"><ShieldCheck size={24} /></span><p className="mt-5 text-sm font-semibold tracking-[.16em] text-cyan-300 uppercase">Policy analysis</p><h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Understand your S3 policy risk.</h1><p className="mt-4 text-slate-400">Upload a JSON bucket policy to explore the S3ShieldAI analysis workflow.</p></div><div className="mx-auto mt-12 max-w-5xl"><UploadExperience /></div></Container><Footer /></main></PageMotion> }
