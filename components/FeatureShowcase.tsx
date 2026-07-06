"use client";

import { BentoCard } from "./BentoCard";
import { Mic, Code, Server, BrainCircuit, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureShowcase() {
  return (
    <section id="features" className="w-full py-32 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Evolved Intelligence. <br />
            <span className="text-gray-600">The Evolution of Infinity.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[450px]">
          
          <BentoCard 
            title="Self-Evolution Engine" 
            description="Infinity analyzes its own codebase and autonomously writes new features to itself permanently based on your requests."
            icon={<Code className="w-8 h-8" />}
            className="md:col-span-2"
          >
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full glass rounded-xl overflow-hidden font-mono text-sm text-neon-purple/70 bg-black/50 border border-white/5 relative">
                {/* Scrolling Code Animation */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -150 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="p-4 whitespace-pre"
                >
                  <span className="text-gray-500"># Compiling user request into core logic...</span>{'\n'}
                  <span className="text-blue-400">class</span> <span className="text-yellow-200">SelfEvolution</span>:{'\n'}
                  {'    '}<span className="text-blue-400">def</span> <span className="text-yellow-200">add_permanent_feature</span>(self, feature_name):{'\n'}
                  {'        '}code = self.ai.generate_module(feature_name){'\n'}
                  {'        '}self.disk.write(<span className="text-green-300">f"core/{"{feature_name}"}.py"</span>, code){'\n'}
                  {'        '}self.engine.hot_reload(){'\n'}
                  {'        '}<span className="text-blue-400">return</span> <span className="text-green-300">"Feature Permanently Installed"</span>{'\n\n'}
                  <span className="text-neon-cyan font-bold">&gt;&gt;&gt; Infinity AI successfully evolved.</span>
                </motion.div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
              </div>
            </div>
          </BentoCard>

          <BentoCard 
            title="Autonomous Diagnostics" 
            description="Generates comprehensive PDF reports of its capabilities, scans internal modules, and self-heals broken code."
            icon={<Activity className="w-8 h-8" />}
          >
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan"
                >
                  <Activity className="text-neon-cyan w-8 h-8" />
                </motion.div>
                <div className="text-center font-mono text-xs space-y-2">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.5, 1] }} className="text-green-400">System Scan: 100%</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 4, delay: 1, times: [0, 0.5, 1] }} className="text-yellow-400">Fixing Broken Modules...</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 4, delay: 2, times: [0, 0.5, 1] }} className="text-neon-purple">PDF Report Generated</motion.p>
                </div>
             </div>
          </BentoCard>

          <BentoCard 
            title="Auto-Fallback to Local AI" 
            description="When cloud API quota runs out, Infinity instantly switches to local Ollama (Llama 3.2). No interruptions, total privacy."
            icon={<Server className="w-8 h-8" />}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-3">
              <div className="w-full glass rounded-lg p-3 text-center border border-red-500/30">
                <p className="text-red-400 font-mono text-xs">Cloud API Limit Reached</p>
              </div>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <Server className="text-gray-500 w-6 h-6" />
              </motion.div>
              <div className="w-full glass rounded-lg p-3 text-center border border-neon-cyan/50 bg-neon-cyan/10">
                <p className="text-neon-cyan font-mono text-xs">Ollama Local Engine Active</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard 
            title="Project Creation Engine" 
            description="Simply say 'Create a Hospital Management System' and Infinity will generate the entire folder structure and open VS Code."
            icon={<BrainCircuit className="w-8 h-8" />}
            className="md:col-span-2"
          >
             <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-8">
               <div className="w-full h-full border border-white/10 rounded-xl relative overflow-hidden bg-[#1e1e1e]">
                  {/* Fake VS Code Header */}
                  <div className="w-full h-8 bg-[#2d2d2d] flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-[10px] text-gray-400 ml-4">hospital_management - VS Code</span>
                  </div>
                  {/* Fake VS Code Sidebar */}
                  <div className="flex h-full">
                    <div className="w-1/3 h-full border-r border-white/5 p-4 space-y-2">
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-2">
                         <span className="text-blue-400 text-xs">📁 backend</span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="flex items-center gap-2 pl-4">
                         <span className="text-yellow-400 text-xs">📄 database.py</span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="flex items-center gap-2 pl-4">
                         <span className="text-blue-300 text-xs">📄 api.py</span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2 }} className="flex items-center gap-2">
                         <span className="text-blue-400 text-xs">📁 frontend</span>
                      </motion.div>
                    </div>
                    {/* Fake VS Code Editor */}
                    <div className="w-2/3 p-4 font-mono text-[10px] text-gray-300">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                        <span className="text-purple-400">import</span> os{'\n'}
                        <span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI{'\n\n'}
                        app = FastAPI(){'\n\n'}
                        <span className="text-gray-500"># Infinity AI generated backend</span>
                      </motion.div>
                    </div>
                  </div>
               </div>
             </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
