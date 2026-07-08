"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Infinity as InfinityIcon } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass mx-4 mt-4 rounded-2xl"
    >
      <div className="flex items-center gap-2">
        <InfinityIcon className="w-8 h-8 text-neon-cyan" />
        <span className="text-xl font-bold tracking-tighter">INFINITY AI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#demo" className="hover:text-white transition-colors">Demo</Link>
        <Link href="#capabilities" className="hover:text-white transition-colors">Capabilities</Link>
        <Link href="#developers" className="hover:text-white transition-colors">Developers</Link>
        <Link href="#feedback" className="hover:text-white transition-colors">Feedback</Link>
      </div>
      
      <a href="https://github.com/kayastha12/Infinity-Ai/releases/download/v1.0.0-beta/Infinity-AI.zip" className="px-4 py-2 text-xs md:text-sm md:px-6 md:py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 text-white font-medium hover:bg-neon-cyan/30 transition-colors">
        Download
      </a>
    </motion.nav>
  );
}
