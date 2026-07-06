"use client";

import { motion } from "framer-motion";
import { Folder, File, Terminal, Layers } from "lucide-react";

const architecture = [
  { name: "Core", desc: "The central nervous system managing tasks and state." },
  { name: "Voice", desc: "Low latency audio processing and transcription." },
  { name: "Memory", desc: "Vector database integration for infinite context." },
  { name: "Providers", desc: "LLM abstraction layer (OpenAI, Anthropic, Local)." },
  { name: "Plugins", desc: "Extensible system for third-party tools." },
  { name: "System", desc: "OS-level hooks and automation scripts." },
];

export default function DeveloperSection() {
  return (
    <section id="developers" className="w-full py-32 px-4 md:px-8 relative z-10 flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6">Built for Students.</h2>
          <p className="text-xl text-gray-400 mb-8">
            Infinity AI is designed with a modular, plugin-first architecture. 
            Extend its capabilities using TypeScript and Python.
          </p>

          <div className="flex flex-col gap-6">
            {architecture.map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-neon-cyan mt-1 border-white/10 shrink-0 bg-[#0a0a0f]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 bg-[#05050a] border-white/5 font-mono text-sm overflow-hidden relative shadow-[0_0_40px_rgba(157,0,255,0.1)]"
        >
          <div className="absolute top-0 right-0 p-4">
            <Terminal className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-gray-500 mb-4 border-b border-white/10 pb-2">/infinity-architecture</h3>
          
          <TreeItem name="packages" type="folder">
             <TreeItem name="core" type="folder">
                <TreeItem name="agent.ts" type="file" />
                <TreeItem name="memory.ts" type="file" />
             </TreeItem>
             <TreeItem name="plugins" type="folder">
                <TreeItem name="vscode.ts" type="file" />
                <TreeItem name="terminal.ts" type="file" />
             </TreeItem>
             <TreeItem name="voice" type="folder">
                <TreeItem name="transcriber.ts" type="file" />
             </TreeItem>
          </TreeItem>
          <TreeItem name="apps" type="folder">
             <TreeItem name="desktop-client" type="folder" />
             <TreeItem name="cli" type="folder" />
          </TreeItem>
          <TreeItem name="infinity.config.ts" type="file" />
        </motion.div>
      </div>
    </section>
  );
}

function TreeItem({ name, type, children }: { name: string, type: "folder" | "file", children?: React.ReactNode }) {
  return (
    <div className="pl-4 mt-2">
      <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 py-1 px-2 rounded-md transition-colors w-fit group">
        {type === "folder" ? (
          <Folder className="w-4 h-4 text-neon-blue group-hover:text-neon-cyan transition-colors" />
        ) : (
          <File className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
        )}
        <span className={`${type === "folder" ? "text-gray-300" : "text-gray-500"} group-hover:text-white transition-colors`}>{name}</span>
      </div>
      {children && (
        <div className="border-l border-white/10 ml-2 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
}
