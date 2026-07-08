import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import InteractiveDemo from "@/components/InteractiveDemo";
import WorkflowPipeline from "@/components/WorkflowPipeline";
import Capabilities from "@/components/Capabilities";
import DeveloperSection from "@/components/DeveloperSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-[#030305]">
      <Navbar />
      <HeroSection />
      <FeatureShowcase />
      <InteractiveDemo />
      <WorkflowPipeline />
      <Capabilities />
      <DeveloperSection />
      <FeedbackSection />
      <Footer />
    </main>
  );
}
