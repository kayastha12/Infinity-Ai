import { Infinity as InfinityIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-white/5 bg-[#030305] relative z-10 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <InfinityIcon className="w-6 h-6 text-neon-cyan" />
          <span className="text-lg font-bold tracking-tighter">INFINITY AI</span>
        </div>
        
        <div className="flex gap-6 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Infinity AI. Developed by Alok Srivastav.
        </div>
      </div>
    </footer>
  );
}
