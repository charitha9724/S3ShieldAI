import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import AnimatedBackground from "./components/Common/AnimatedBackground";

const Analyze = lazy(() => import("./pages/Analyze"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#0A0E1A] text-sm text-slate-400">
      Loading workspace…
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        <AnimatedRoutes />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#121827",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </div>
  );
}