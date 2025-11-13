"use client";

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Dna,
  Microscope,
  HeartPulse,
  FileText,
  ChevronRight,
  Shield,
  Bot,
  BrainCircuit,
  Target,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Data for the Healthcare Page ---
const healthcareSolutions = [
  {
    icon: Dna,
    title: "Genomic Data Analysis",
    description: "Process petabytes of genomic data to identify novel biomarkers and genetic drivers of disease with unparalleled speed and accuracy.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Microscope,
    title: "Drug Discovery & Development",
    description: "Accelerate molecule screening, predict compound efficacy, and de-risk your development pipeline using advanced biological models.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: HeartPulse,
    title: "Predictive Diagnostics",
    description: "Build models that analyze medical imaging and EHR data to predict disease onset and progression, enabling early intervention.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FileText,
    title: "Clinical Trial Optimization",
    description: "Intelligently design trials, identify optimal patient cohorts, and predict outcomes to reduce costs and accelerate time to market.",
    color: "from-orange-500 to-red-500",
  },
];

const drugDiscoverySteps = [
    {
        featureId: "target-id",
        icon: Target,
        title: "Identify Novel Targets",
        description: "Our AI sifts through millions of data points—from genomic sequences to research literature—to identify and validate novel biological targets with the highest therapeutic potential."
    },
    {
        featureId: "molecule-design",
        icon: Sparkles,
        title: "Generate Candidate Molecules",
        description: "Leveraging generative AI, our platform designs millions of novel, drug-like molecules optimized for specificity and efficacy against the identified target."
    },
    {
        featureId: "efficacy-prediction",
        icon: BrainCircuit,
        title: "Predict Efficacy & Safety",
        description: "We simulate how candidate molecules will interact within complex biological systems, predicting their efficacy, toxicity, and ADME properties before a single real-world experiment."
    }
];

const testimonial = {
    quote: "With Gradies, we're navigating the complexities of cancer biology at a speed we never thought possible. Their platform's ability to identify novel drug targets from our genomic data has been transformative for our R&D pipeline.",
    name: "Dr. Elena Vance",
    title: "Director of Oncology Research, Aethelred Institute",
    image: "/images/user-healthcare.jpg", // Replace with a suitable image
};

export default function HealthcarePage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- GENERAL FADE-IN ANIMATIONS ---
      const sections = gsap.utils.toArray('.animated-section');
      sections.forEach((section) => {
          gsap.from(section, {
              autoAlpha: 0,
              y: 50,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  toggleActions: "play none none none"
              }
          });
      });

      // --- DRUG DISCOVERY SCROLLYTELLING ANIMATION (DESKTOP ONLY) ---
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          const narrativePanels = gsap.utils.toArray('.scroll-trigger');
          const visualPanels = gsap.utils.toArray('.feature-view');
          
          gsap.set(visualPanels, { zIndex: (i) => i, autoAlpha: 0, scale: 0.9 });
          gsap.set(visualPanels[0], { autoAlpha: 1, scale: 1 });
          gsap.set(narrativePanels, { opacity: 0.4 });
          gsap.set(narrativePanels[0], { opacity: 1 });

          narrativePanels.forEach((panel, i) => {
            ScrollTrigger.create({
              trigger: panel,
              start: "top center",
              end: "bottom center",
              onEnter: () => {
                gsap.to(visualPanels, { autoAlpha: 0, scale: 0.9, duration: 0.5, ease: "power2.inOut" });
                gsap.to(visualPanels[i], { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.inOut" });
                gsap.to(narrativePanels, { opacity: 0.4, duration: 0.3 });
                gsap.to(panel, { opacity: 1, duration: 0.3 });
              },
              onEnterBack: () => {
                gsap.to(visualPanels, { autoAlpha: 0, scale: 0.9, duration: 0.5, ease: "power2.inOut" });
                gsap.to(visualPanels[i], { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.inOut" });
                gsap.to(narrativePanels, { opacity: 0.4, duration: 0.3 });
                gsap.to(panel, { opacity: 1, duration: 0.3 });
              }
            });
          });
          
          ScrollTrigger.create({
              trigger: "#drug-discovery-section",
              start: "top top",
              end: "bottom bottom",
              pin: "#sticky-visual-container"
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black text-white overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-16 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-16 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24 space-y-24 lg:space-y-40">
        {/* --- Section 1: Hero --- */}
        <section className="animated-section text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-500/30">
            Use Case: Healthcare & Life Sciences
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Accelerating Medical
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Breakthroughs
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            Empower your research with an AI platform that understands the language of biology. From drug discovery to clinical trials, Gradies helps you find answers faster and improve patient outcomes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg">
                Schedule a Consultation
                <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* --- Section 2: Solutions Grid --- */}
        <section className="animated-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">An End-to-End Biomedical AI Platform</h2>
            <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">Address the most critical challenges in life sciences with our purpose-built AI solutions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {healthcareSolutions.map((solution) => (
              <Card key={solution.title} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8 text-center flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
                    <p className="text-gray-300 flex-grow text-sm leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --- Section 3: Interactive Application Showcase --- */}
        <section id="drug-discovery-section" className="relative min-h-[150vh] lg:min-h-0">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Sticky Visual Canvas */}
            <div id="sticky-visual-container" className="h-[60vh] lg:h-screen w-full flex items-center">
              <div className="relative w-full h-full max-h-[600px]">
                {/* Visual for Target ID */}
                <div data-feature="target-id" className="feature-view absolute inset-0">
                    <Card className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-700 shadow-2xl p-6 flex flex-col">
                      <div className="flex-shrink-0 mb-4"><Badge variant="outline" className="border-blue-400/30 text-blue-300">Step 1: Target Identification</Badge></div>
                      <div className="flex-grow relative bg-black/30 rounded-lg overflow-hidden flex items-center justify-center">
                         {/* Mock Gene Network */}
                         <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs><linearGradient id="g-blue"><stop offset="0%" stopColor="#3B82F6"/></linearGradient></defs>
                            <circle cx="100" cy="100" r="15" fill="url(#g-blue)" className="animate-pulse shadow-lg" />
                            {[...Array(8)].map((_, i) => <circle key={i} cx={100 + 70 * Math.cos(i*45*Math.PI/180)} cy={100 + 70 * Math.sin(i*45*Math.PI/180)} r="8" fill="#4B5563" />)}
                            {[...Array(8)].map((_, i) => <line key={i} x1="100" y1="100" x2={100 + 70 * Math.cos(i*45*Math.PI/180)} y2={100 + 70 * Math.sin(i*45*Math.PI/180)} stroke="#4B5563" strokeWidth="1"/>)}
                         </svg>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm">BRCA1</div>
                      </div>
                    </Card>
                </div>
                {/* Visual for Molecule Design */}
                <div data-feature="molecule-design" className="feature-view absolute inset-0">
                    <Card className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-700 shadow-2xl p-6 flex flex-col">
                      <div className="flex-shrink-0 mb-4"><Badge variant="outline" className="border-purple-400/30 text-purple-300">Step 2: Molecule Generation</Badge></div>
                      <div className="flex-grow relative bg-black/30 rounded-lg overflow-hidden grid grid-cols-3 gap-4 p-4">
                        {[...Array(6)].map((_,i) => <Image key={i} src="/images/molecule.svg" alt="Molecule" width={100} height={100} className="w-full h-auto opacity-70 animate-pulse" style={{animationDelay: `${i*100}ms`}}/>)}
                      </div>
                    </Card>
                </div>
                {/* Visual for Efficacy Prediction */}
                <div data-feature="efficacy-prediction" className="feature-view absolute inset-0">
                    <Card className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-700 shadow-2xl p-6 flex flex-col">
                      <div className="flex-shrink-0 mb-4"><Badge variant="outline" className="border-green-400/30 text-green-300">Step 3: Efficacy Prediction</Badge></div>
                      <div className="flex-grow relative bg-black/30 rounded-lg p-6 flex flex-col justify-end">
                         {/* Mock Bar Chart */}
                         <div className="flex items-end justify-around h-full">
                            <div className="w-1/4 bg-gradient-to-t from-green-500/50 to-green-500 rounded-t-lg" style={{height: '85%'}}><div className="text-center text-xs -mt-5">Mol-A</div></div>
                            <div className="w-1/4 bg-gradient-to-t from-yellow-500/50 to-yellow-500 rounded-t-lg" style={{height: '60%'}}><div className="text-center text-xs -mt-5">Mol-B</div></div>
                            <div className="w-1/4 bg-gradient-to-t from-red-500/50 to-red-500 rounded-t-lg" style={{height: '30%'}}><div className="text-center text-xs -mt-5">Mol-C</div></div>
                         </div>
                      </div>
                    </Card>
                </div>
              </div>
            </div>

            {/* Right Column - Narrative Panels */}
            <div className="lg:pt-24 space-y-72 lg:space-y-96">
                {drugDiscoverySteps.map((step) => (
                    <div key={step.featureId} className="scroll-trigger space-y-6" data-feature={step.featureId}>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <step.icon className="w-8 h-8 text-white"/>
                        </div>
                        <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                        <p className="text-lg text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* --- Section 4: Testimonial --- */}
        <section className="animated-section">
             <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/30 via-black/30 to-purple-900/30 rounded-2xl border border-blue-500/20 p-8 lg:p-12 shadow-2xl shadow-blue-500/10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <Image src={testimonial.image} alt={testimonial.name} width={120} height={120} className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-blue-500/50 flex-shrink-0"/>
                    <div className="text-center lg:text-left">
                        <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed italic mb-6">"{testimonial.quote}"</p>
                        <h4 className="font-semibold text-lg text-white">{testimonial.name}</h4>
                        <p className="text-blue-300">{testimonial.title}</p>
                    </div>
                </div>
             </div>
        </section>

        {/* --- Section 5: Security & CTA --- */}
        <section className="animated-section text-center max-w-3xl mx-auto">
            <Bot className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">HIPAA-Compliant & Secure by Design</h2>
            <p className="text-lg text-gray-300 mb-8">
                We understand the sensitivity of patient data. Our platform is built on a foundation of enterprise-grade security, ensuring full compliance with HIPAA and GDPR, so you can innovate with confidence.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Explore Security Architecture
            </Button>
        </section>
      </div>
    </div>
  );
}