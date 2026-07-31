import Cta from '../components/landing/Cta'
import Features from '../components/landing/Features'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import PageMotion from '../components/Common/PageMotion'
export default function Home() { return <PageMotion><main className="min-h-screen"><Navbar /><Hero /><HowItWorks /><Features /><Cta /><Footer /></main></PageMotion> }
