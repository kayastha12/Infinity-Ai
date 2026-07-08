"use client";

import { Canvas } from "@react-three/fiber";
import AICore from "@/three/AICore";
import { motion } from "framer-motion";
import { Download, Play, GitBranch, FileText } from "lucide-react";
import { useState } from "react";
import DemoModal from "./DemoModal";

export default function HeroSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <AICore />
        </Canvas>
      </div>

      {/* Contrast Overlay for Text Readability */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-black/30 pointer-events-none" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
          <span className="text-xs font-medium uppercase tracking-widest text-gray-300">Powered by Gemini & Ollama</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6"
        >
          <span className="text-gradient">The Future of</span><br />
          <span className="text-gradient-neon drop-shadow-[0_0_20px_rgba(157,0,255,0.4)]">Personal Intelligence</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl font-light"
        >
          Not just another AI Assistant.<br/>Your <span className="text-white font-medium">Autonomous Digital Companion</span> built for extreme productivity.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto w-full sm:w-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-start">
            <div className="flex flex-col items-center w-full sm:w-auto gap-2">
              <a href="https://github.com/kayastha12/Infinity-Ai/releases/download/v1.0.0-beta/Infinity-AI.zip" className="flex items-center justify-center sm:justify-start gap-2 px-8 py-4 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 text-white font-bold hover:bg-neon-cyan/30 transition-colors w-full sm:w-auto">
                <Download className="w-5 h-5" />
                Download App
              </a>
              <span className="text-[10px] text-yellow-500 font-mono text-center px-4 max-w-[200px] leading-tight">
                ⚠️ Testing Phase: May contain errors.
              </span>
            </div>
            <button onClick={() => setIsDemoOpen(true)} className="flex items-center justify-center sm:justify-start gap-2 px-8 py-4 rounded-full glass hover:bg-white/10 transition-colors text-white font-medium group w-full sm:w-auto h-14">
              <Play className="w-5 h-5 text-neon-cyan group-hover:text-white transition-colors" />
              Watch Demo
            </button>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center justify-center w-14 h-14 rounded-full glass hover:bg-white/10 transition-colors text-white">
              <GitBranch className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-14 h-14 rounded-full glass hover:bg-white/10 transition-colors text-white">
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
}
