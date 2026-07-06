"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Folder, FileCode, CheckCircle2, Loader2, Maximize, Minus, X } from "lucide-react";

export default function InteractiveDemo() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const timeouts = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => setStep(4), 6500),
      setTimeout(() => setStep(5), 8500),
      setTimeout(() => setStep(6), 11000),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section id="demo" className="w-full py-32 px-4 md:px-8 relative z-10 flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Watch it work.</h2>
        <p className="text-xl text-gray-400">From idea to execution in seconds.</p>
      </div>

      <div ref={containerRef} className="w-full max-w-6xl aspect-[16/10] md:aspect-video bg-black/40 border border-white/10 rounded-2xl p-2 relative overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.05)]">
        {/* Desktop Background */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        
        {/* Chat Window */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 md:top-8 left-4 md:left-8 w-[90%] md:w-80 glass-card rounded-xl border border-white/10 flex flex-col overflow-hidden z-20 bg-[#0a0a0f]/90"
        >
          <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-3 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-gray-400 ml-2 font-medium">Infinity AI</span>
          </div>
          
          <div className="p-4 flex flex-col gap-4 min-h-[250px] md:min-h-[300px]">
            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="self-end bg-neon-purple/20 text-white px-3 py-2 rounded-lg text-sm border border-neon-purple/30 max-w-[90%]">
                <Typewriter text="Create Hospital Management System" speed={40} />
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start flex items-center gap-2 text-sm text-gray-400">
                {step === 2 ? <Loader2 className="w-4 h-4 animate-spin text-neon-cyan" /> : <CheckCircle2 className="w-4 h-4 text-green-400" />}
                {step === 2 ? "Thinking..." : "Task understood."}
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start flex items-center gap-2 text-sm text-gray-400">
                {step === 3 ? <Loader2 className="w-4 h-4 animate-spin text-neon-cyan" /> : <CheckCircle2 className="w-4 h-4 text-green-400" />}
                {step === 3 ? "Planning architecture..." : "Plan created."}
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start flex items-center gap-2 text-sm text-gray-400">
                {step === 4 ? <Loader2 className="w-4 h-4 animate-spin text-neon-cyan" /> : <CheckCircle2 className="w-4 h-4 text-green-400" />}
                {step === 4 ? "Generating files..." : "Files generated."}
              </motion.div>
            )}
            
            {step >= 6 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="self-start bg-neon-cyan/10 text-neon-cyan px-3 py-2 rounded-lg text-sm border border-neon-cyan/30 mt-4">
                Done! I've opened the project for you.
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* File Explorer */}
        {step >= 4 && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, x: -50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            className="hidden md:flex absolute top-16 left-96 w-64 glass-card rounded-xl border border-white/10 flex-col overflow-hidden z-10 bg-[#12121a]/90"
          >
             <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-3 gap-2">
               <span className="text-xs text-gray-400 font-medium">hospital-system</span>
             </div>
             <div className="p-3 flex flex-col gap-2">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 text-sm text-gray-300">
                  <Folder className="w-4 h-4 text-blue-400" /> src
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 text-sm text-gray-300 ml-4">
                  <Folder className="w-4 h-4 text-blue-400" /> components
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-2 text-sm text-gray-300 ml-4">
                  <FileCode className="w-4 h-4 text-yellow-400" /> App.tsx
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center gap-2 text-sm text-gray-300">
                  <FileCode className="w-4 h-4 text-gray-400" /> package.json
                </motion.div>
             </div>
          </motion.div>
        )}

        {/* VS Code Window */}
        {step >= 5 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden md:flex absolute top-24 right-8 bottom-8 left-[450px] bg-[#1e1e1e] rounded-xl border border-white/10 flex-col overflow-hidden shadow-2xl z-30"
          >
             <div className="h-10 bg-[#323233] border-b border-[#1e1e1e] flex items-center px-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">App.tsx - hospital-system</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                   <Minus className="w-4 h-4" />
                   <Maximize className="w-4 h-4" />
                   <X className="w-4 h-4" />
                </div>
             </div>
             <div className="p-4 font-mono text-sm overflow-hidden flex-1 relative">
                <div className="text-gray-500 absolute left-4 top-4 select-none text-right pr-4 border-r border-gray-700 h-full">
                  1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10
                </div>
                <div className="ml-10">
                  <Typewriter text={`import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PatientList } from './components/PatientList';

export default function App() {
  const [view, setView] = useState('dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
    </div>
  );
}`} speed={20} />
                </div>
             </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Typewriter({ text, speed = 50 }: { text: string, speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
}
