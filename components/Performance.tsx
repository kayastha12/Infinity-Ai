"use client";
import { motion, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter" />;
}

const stats = [
  { label: "Projects Generated", value: 120540, duration: 2 },
  { label: "Commands Executed", value: 9800400, duration: 2.5, suffix: "+" },
  { label: "Lines of Code Generated", value: 15400000, duration: 3, suffix: "+" },
  { label: "System Automations", value: 450200, duration: 2 },
];

export default function Performance() {
  return (
    <section className="w-full py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center bg-[#0a0a0f] border-white/5"
          >
            <Counter from={0} to={stat.value} duration={stat.duration} suffix={stat.suffix} />
            <span className="text-xs md:text-sm font-medium text-neon-cyan mt-4 uppercase tracking-widest">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
