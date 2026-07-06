"use client";

import { motion } from "framer-motion";
import { AppWindow, FolderPlus, FileJson, Edit3, MonitorDot, ImageIcon, Search, Globe, HardDrive, Network, Brain, TerminalSquare } from "lucide-react";

const capabilities = [
  { title: "Open any application", icon: <AppWindow /> },
  { title: "Create projects", icon: <FolderPlus /> },
  { title: "Generate code", icon: <FileJson /> },
  { title: "Modify code", icon: <Edit3 /> },
  { title: "Control Windows", icon: <MonitorDot /> },
  { title: "Analyze screenshots", icon: <ImageIcon /> },
  { title: "Search YouTube", icon: <Search /> },
  { title: "Search Google", icon: <Globe /> },
  { title: "Memory", icon: <HardDrive /> },
  { title: "RAG", icon: <Network /> },
  { title: "Plugin System", icon: <TerminalSquare /> },
  { title: "Self Learning", icon: <Brain /> },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="w-full py-32 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">Unlimited Capabilities.</h2>
          <p className="text-xl text-gray-400">If you can do it on a computer, Infinity can do it faster.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center cursor-pointer group bg-[#0a0a0f]/60 hover:bg-[#12121a] hover:border-neon-purple/50 transition-colors"
            >
              <div className="text-gray-400 group-hover:text-neon-purple transition-colors">
                {cap.icon}
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{cap.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
