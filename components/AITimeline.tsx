"use client";

import { motion } from "framer-motion";

const events = [
  { year: "2023", title: "Version 1", desc: "The foundation of personal AI." },
  { year: "2024", title: "Voice Assistant", desc: "Natural language processing integrated." },
  { year: "2024", title: "Automation", desc: "System-level control achieved." },
  { year: "2025", title: "Project AI", desc: "Autonomous coding and folder management." },
  { year: "2025", title: "RAG", desc: "Infinite context memory implemented." },
  { year: "2026", title: "Infinity AI", desc: "The ultimate desktop companion." },
  { year: "Future", title: "AI Operating System", desc: "Replacing traditional OS paradigms." },
];

export default function AITimeline() {
  return (
    <section className="w-full py-32 px-4 relative z-10 flex flex-col items-center overflow-hidden">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-bold tracking-tighter mb-4">The Evolution.</h2>
      </div>

      <div className="relative max-w-3xl w-full">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 3, ease: "linear" }}
          viewport={{ once: true }}
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan -translate-x-1/2 origin-top" 
        />

        {events.map((event, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex items-center mb-16 ${isLeft ? "justify-start pr-8 md:pr-0" : "justify-end pl-8 md:pl-0"}`}
            >
               {/* Dot */}
               <div className="absolute left-1/2 w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-neon-cyan -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,255,255,0.8)] hidden md:block" />
               
               {/* Content */}
               <div className={`w-full md:w-[45%] glass p-6 rounded-2xl ${isLeft ? "md:text-right" : "md:text-left"}`}>
                 <span className="text-neon-cyan font-mono text-sm">{event.year}</span>
                 <h3 className="text-2xl font-bold mt-1 mb-2">{event.title}</h3>
                 <p className="text-gray-400">{event.desc}</p>
               </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
