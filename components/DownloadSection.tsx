"use client";

import { motion } from "framer-motion";
import { Download, Monitor, FileText, GitBranch, MessagesSquare, HardDrive, Cpu, Zap } from "lucide-react";

export default function DownloadSection() {
  return (
    <section className="w-full py-32 px-4 relative z-10 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl glass-card rounded-[3rem] p-8 md:p-16 flex flex-col items-center text-center bg-gradient-to-b from-[#0a0a0f] to-[#05050a] border-white/10 relative overflow-hidden"
      >
        {/* Glowing Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-neon-cyan/20 blur-[100px] pointer-events-none rounded-full" />
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 relative z-10">Ready to evolve?</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl relative z-10">
          Join thousands of developers and professionals who have already upgraded their workflow with Infinity AI.
        </p>

        <div className="flex flex-col items-center gap-2 mb-16 relative z-10">
          <a 
            href="https://github.com/kayastha12/Infinity-Ai/releases/download/v1.0.0-beta/Infinity-AI.zip" 
            className="flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)] group"
          >
            <Download className="w-6 h-6 group-hover:animate-bounce" />
            Download for Windows 11
          </a>
          <span className="text-xs text-yellow-500 font-mono mt-2">
            ⚠️ Testing Phase: May contain errors.
          </span>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left relative z-10 border-t border-white/10 pt-16">
          
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Monitor className="w-5 h-5 text-neon-cyan" /> System Requirements</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Zap className="w-4 h-4" /> Windows 11 (22H2 or later)</li>
              <li className="flex items-center gap-2"><Cpu className="w-4 h-4" /> 16GB RAM minimum</li>
              <li className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> 2GB Disk Space</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-neon-purple" /> Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Release Notes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><MessagesSquare className="w-5 h-5 text-neon-blue" /> Community</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><GitBranch className="w-4 h-4" /> GitHub Repository</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><MessagesSquare className="w-4 h-4" /> Discord Server</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Zap className="w-4 h-4" /> Twitter / X</a></li>
            </ul>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
