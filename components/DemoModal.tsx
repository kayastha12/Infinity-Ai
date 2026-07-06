"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Terminal, Server, Code, Activity, FastForward, FileText, FolderTree, MessageSquare, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [scene, setScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const scenes = [
    { id: 1, title: "AI Chat Powered by Gemini & APIs", duration: 7000 },
    { id: 2, title: "1-Prompt Student Project Creation & File Management", duration: 9000 },
    { id: 3, title: "Offline Module Powered by Ollama", duration: 7000 },
    { id: 4, title: "Self-Evolution Capability", duration: 8000 },
    { id: 5, title: "System Diagnosis", duration: 7000 },
  ];

  useEffect(() => {
    if (!isOpen) {
      setScene(0);
      setIsPlaying(true);
      return;
    }

    if (!isPlaying) return;

    if (scene >= scenes.length) {
      // Show the ending screen for 4 seconds, then loop
      const endTimer = setTimeout(() => setScene(0), 4000);
      return () => clearTimeout(endTimer);
    }

    const timer = setTimeout(() => {
      setScene(prev => prev + 1);
    }, scenes[scene]?.duration || 5000);

    return () => clearTimeout(timer);
  }, [isOpen, scene, isPlaying]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Player Container */}
          <div className="w-full max-w-6xl h-[85vh] md:h-auto md:aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative shadow-[0_0_100px_rgba(0,255,255,0.1)] flex flex-col">
            
            {/* Cinematic Top Bar */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none flex items-start p-4">
              <span className="text-white/70 font-mono text-sm tracking-widest uppercase">
                Infinity AI / {scenes[scene]?.title || "And Many More..."}
              </span>
            </div>

            {/* Scene Renderer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {scene === 0 && <Scene1 key="scene1" />}
                {scene === 1 && <Scene2 key="scene2" />}
                {scene === 2 && <Scene3 key="scene3" />}
                {scene === 3 && <Scene4 key="scene4" />}
                {scene === 4 && <Scene5 key="scene5" />}
                {scene === 5 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center flex flex-col items-center gap-6"
                  >
                    <Sparkles className="w-16 h-16 text-neon-cyan" />
                    <h2 className="text-5xl font-bold text-white mb-2">And Many More Features...</h2>
                    <p className="text-xl text-gray-400">Join the Waitlist to get early access to Infinity AI.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Video Controls Bottom Bar */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent z-20 flex items-end p-6 gap-4">
              <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-neon-cyan transition-colors relative z-30">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              {/* Progress Bar */}
              <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
                {scene < scenes.length && (
                   <motion.div 
                     key={`progress-${scene}`}
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: scenes[scene].duration / 1000, ease: "linear" }}
                     className="absolute left-0 top-0 bottom-0 bg-neon-cyan"
                   />
                )}
              </div>
              <span className="text-xs font-mono text-white/50">
                00:0{scene + 1} / 00:0{scenes.length + 1}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ========================== SCENES ========================== //

function Scene1() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-4 md:p-12"
    >
      <div className="w-full max-w-3xl flex flex-col gap-6">
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="self-end bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl rounded-tr-sm max-w-[85%] md:max-w-lg text-sm md:text-base">
            "Analyze this dataset and give me insights."
         </motion.div>
         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="self-start bg-white/10 text-white px-4 py-3 md:px-6 md:py-4 rounded-2xl rounded-tl-sm border border-white/5 flex items-start gap-4 max-w-[95%] md:max-w-none">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shrink-0">
               <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
               <p className="text-sm text-gray-300 font-mono mb-2 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                 Powered by Gemini 1.5 Pro
               </p>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                 <p className="text-gray-200">I've analyzed the dataset using Advanced Data APIs. Here are the key insights...</p>
                 <div className="mt-4 w-full h-24 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-xs text-gray-500">[Interactive Chart Generated]</span>
                 </div>
               </motion.div>
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
}

function Scene2() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col md:flex-row items-center justify-center bg-[#050505] p-4 md:p-12 gap-4 md:gap-8 overflow-y-auto overflow-x-hidden"
    >
      {/* Prompt Window */}
      <div className="w-1/3 flex flex-col justify-center h-full gap-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-lg md:text-xl font-light text-white leading-relaxed text-center md:text-left"
        >
          <span className="text-neon-purple font-bold">1-Prompt Project:</span><br/> "Create a student portfolio website, manage all files, and set up the directories."
        </motion.p>
      </div>

      {/* File Management UI */}
      <div className="w-full md:w-2/3 h-64 md:h-96 bg-[#111] rounded-xl border border-white/10 flex flex-col sm:flex-row shadow-2xl relative overflow-hidden">
        <div className="w-full sm:w-48 md:w-64 h-32 sm:h-full border-b sm:border-b-0 sm:border-r border-white/5 bg-[#161616] p-4 flex flex-col overflow-y-auto">
           <div className="flex items-center gap-2 text-gray-400 mb-6 pb-4 border-b border-white/5">
             <FolderTree className="w-4 h-4" />
             <span className="text-xs font-semibold tracking-wider">FILE MANAGEMENT</span>
           </div>
           
           <div className="font-mono text-xs space-y-3">
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="flex items-center gap-2 text-blue-400">
               📁 student_portfolio
             </motion.div>
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }} className="flex items-center gap-2 pl-4 text-gray-300">
               📁 src
             </motion.div>
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.5 }} className="flex items-center gap-2 pl-8 text-yellow-200">
               📄 index.html
             </motion.div>
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 4.5 }} className="flex items-center gap-2 pl-8 text-cyan-200">
               📄 style.css
             </motion.div>
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 5.5 }} className="flex items-center gap-2 pl-8 text-yellow-400">
               📄 script.js
             </motion.div>
           </div>
        </div>
        <div className="flex-1 p-4 md:p-6 font-mono text-[10px] md:text-xs text-gray-400 relative overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.5 }}>
            <span className="text-gray-500">/* Infinity AI: Generating student project */</span>{'\n\n'}
            <span className="text-purple-400">const</span> <span className="text-blue-300">initPortfolio</span> = () {`=>`} {'{\n'}
            {'  '}document.<span className="text-yellow-200">getElementById</span>(<span className="text-green-300">'app'</span>).<span className="text-yellow-200">render</span>();{'\n'}
            {'}\n\n'}
            <span className="text-neon-cyan">&gt;&gt; Files successfully managed and saved to disk.</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Scene3() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-4 md:p-12 gap-8 md:gap-12"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: [1, 0.5, 1], scale: 1 }} transition={{ duration: 1, repeat: 2 }}
        className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-red-500/20 border border-red-500 text-red-400 font-mono text-[10px] md:text-sm text-center"
      >
        INTERNET DISCONNECTED / API LIMIT REACHED
      </motion.div>

      <div className="flex items-center gap-4 md:gap-12">
        <div className="flex flex-col items-center gap-4 opacity-30">
          <Server className="w-16 h-16 text-gray-500" />
          <span className="font-mono text-xs text-gray-500">Cloud APIs</span>
        </div>

        <motion.div 
          initial={{ width: 0 }} animate={{ width: 100 }} transition={{ delay: 1, duration: 0.5 }}
          className="h-1 bg-neon-purple relative"
        >
          <motion.div animate={{ x: [0, 100] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute -top-1 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#f0f]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-4 relative"
        >
          <div className="absolute inset-0 bg-neon-purple/20 blur-xl rounded-full" />
          <Server className="w-20 h-20 text-neon-purple relative z-10" />
          <span className="font-mono text-sm text-neon-purple relative z-10 font-bold">Offline Module Engaged</span>
          <span className="font-mono text-xs text-green-400">Powered by Ollama</span>
        </motion.div>
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="text-gray-400 font-mono text-center">
        Zero downtime. 100% Privacy.<br/>Infinity continues working offline seamlessly.
      </motion.p>
    </motion.div>
  );
}

function Scene4() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-4 md:p-12 overflow-y-auto"
    >
      <div className="mb-8 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-2xl font-light text-white"
        >
          <span className="text-gray-500">User:</span> "Infinity, write a new capability and inject it permanently."
        </motion.p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-72">
        {/* Left: AI Thoughts */}
        <div className="bg-[#111] rounded-lg border border-white/10 p-4 font-mono text-xs overflow-hidden relative">
          <h3 className="text-neon-cyan mb-4 border-b border-white/10 pb-2">Self-Evolution Core</h3>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-gray-400 mb-2">
            &gt; Analyzing request: Adding permanent capability.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-gray-400 mb-2">
            &gt; Designing Python Module...
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="text-gray-400 mb-2">
            &gt; Writing system file...
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }} className="text-green-400 mt-4 font-bold">
            &gt; Ready to evolve.
          </motion.p>
        </div>

        {/* Right: Code Injection */}
        <div className="bg-[#0a0f1c] rounded-lg border border-blue-500/30 p-4 font-mono text-[10px] sm:text-xs overflow-hidden flex flex-col">
          <h3 className="text-blue-400 mb-4 border-b border-blue-500/30 pb-2 flex items-center gap-2">
            <Code className="w-4 h-4" /> core/new_capability.py (LIVE EDIT)
          </h3>
          <div className="flex-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
              <span className="text-purple-400">class</span> <span className="text-yellow-200">NewCapability</span>:{'\n'}
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-300">execute</span>(self):{'\n'}
              {'        '}self.system.upgrade(){'\n'}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 6 }} className="mt-4 md:mt-auto p-2 bg-green-500/20 text-green-400 text-center rounded border border-green-500 font-bold tracking-widest text-[8px] sm:text-xs">
            EVOLUTION COMPLETE. HOT-RELOADED.
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Scene5() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-12"
    >
       <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-neon-cyan rounded-full" />
         <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-2 border-b-2 border-neon-purple rounded-full" />
         <Activity className="w-16 h-16 text-white relative z-10" />
         <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-neon-cyan rounded-full" />
       </div>

       <div className="font-mono text-center space-y-4 text-sm">
         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-300">Running System Diagnosis...</motion.p>
         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-gray-300">Scanning Architecture: <span className="text-green-400">Stable</span></motion.p>
         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-yellow-400">Warning: Minor latency in Router Module</motion.p>
         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="text-neon-cyan font-bold">Autonomous Self-Healing Initiated...</motion.p>
         <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 4.5 }}
            className="mt-6 px-6 py-3 rounded bg-white text-black font-bold flex items-center justify-center gap-2"
         >
           <FileText className="w-5 h-5" />
           Diagnostic PDF Report Available
         </motion.div>
       </div>
    </motion.div>
  );
}
