"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, RefreshCw, Mail, Calendar, User, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "infinity2026") {
      setIsAuthenticated(true);
      fetchFeedback();
    } else {
      setError("Incorrect password");
    }
  };

  const fetchFeedback = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      
      // Data might come as stringified JSON if using older KV SDK versions, so we parse if needed
      const parsedData = (data.feedback || []).map((item: any) => {
        if (typeof item === 'string') return JSON.parse(item);
        return item;
      });
      
      setFeedback(parsedData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not fetch feedback. Check your database connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030305] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl max-w-md w-full bg-[#05050a] border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/20 rounded-full blur-[60px]" />
          
          <Lock className="w-12 h-12 text-neon-cyan mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
          <p className="text-gray-400 mb-8 text-sm">Enter the admin password to view feedback.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4 relative z-10">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full py-3 rounded-xl bg-neon-cyan text-black font-bold hover:bg-white transition-colors">
              Unlock Dashboard
            </button>
          </form>
          
          <div className="mt-8">
            <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
              &larr; Back to Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gradient">Feedback Dashboard</h1>
            <p className="text-gray-400 text-sm">Viewing user submissions from Infinity AI.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchFeedback}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link href="/" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm">
              Exit
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {feedback.length === 0 && !loading && !error && (
            <div className="text-center py-20 text-gray-500 glass-card rounded-2xl border-dashed">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No feedback received yet.</p>
            </div>
          )}

          {feedback.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap font-light">
                    "{item.message}"
                  </p>
                </div>
                
                <div className="md:w-64 flex flex-col gap-3 md:border-l border-white/10 md:pl-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4 text-neon-cyan" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="w-4 h-4 text-neon-cyan" />
                    <span className="truncate">{item.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4 text-neon-cyan" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
