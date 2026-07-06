"use client";

import { motion } from "framer-motion";
import { Mic, Cpu, NotebookPen, Code, CheckCircle, Flag } from "lucide-react";

const steps = [
  { id: "voice", label: "Voice", icon: <Mic className="w-6 h-6" /> },
  { id: "thinking", label: "Thinking", icon: <Cpu className="w-6 h-6" /> },
  { id: "planning", label: "Planning", icon: <NotebookPen className="w-6 h-6" /> },
  { id: "execution", label: "Execution", icon: <Code className="w-6 h-6" /> },
  { id: "verification", label: "Verification", icon: <CheckCircle className="w-6 h-6" /> },
  { id: "completion", label: "Completion", icon: <Flag className="w-6 h-6" /> },
];

export default function WorkflowPipeline() {
  return (
    <section className="w-full py-32 px-4 md:px-8 relative z-10 flex flex-col items-center">
      <div className="text-center mb-24">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">Autonomous Pipeline.</h2>
        <p className="text-xl text-gray-400">Watch the thought process unfold in real-time.</p>
      </div>

      <div className="max-w-5xl w-full relative flex flex-col md:flex-row justify-between items-center px-8 py-16 glass rounded-3xl bg-[#0a0a0f]/80">
         {/* Connecting Line */}
         <div className="absolute top-1/2 left-16 right-16 h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
         <div className="absolute top-16 bottom-16 left-1/2 w-1 bg-white/10 -translate-x-1/2 md:hidden" />
         
         {/* Animated Line Progress */}
         <motion.div 
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           transition={{ duration: 3, ease: "easeInOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple -translate-y-1/2 origin-left hidden md:block" 
         />

         {steps.map((step, index) => (
           <motion.div 
             key={step.id}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: index * 0.5 }}
             viewport={{ once: true, margin: "-100px" }}
             className="relative z-10 flex flex-col items-center gap-4 my-6 md:my-0"
           >
             <motion.div 
               whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0,255,255,0.5)" }}
               className="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/20 text-white relative bg-[#12121a] hover:border-neon-cyan transition-colors"
             >
               {step.icon}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1.2 }}
                 transition={{ duration: 0.5, delay: index * 0.5 + 0.3, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                 className="absolute inset-0 rounded-full border border-neon-cyan pointer-events-none"
               />
             </motion.div>
             <span className="text-xs md:text-sm font-semibold text-gray-300 tracking-wider uppercase">{step.label}</span>
           </motion.div>
         ))}
      </div>
    </section>
  );
}
