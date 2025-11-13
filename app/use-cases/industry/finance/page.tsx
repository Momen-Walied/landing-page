"use client";

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import * as React from 'react';

import {
  TrendingUp,
  Shield,
  FileText,
  Zap,
  ChevronRight,
  DatabaseZap,
  BrainCircuit,
  ArrowRight,
  BarChart3,
  Bot
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Data for the Finance Page ---
const financeSolutions = [
  {
    icon: TrendingUp,
    title: "Quantitative Alpha Generation",
    description: "Leverage our AI to analyze vast, alternative datasets and uncover non-obvious market signals and predictive patterns for superior returns.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "AI-Powered Risk & Compliance",
    description: "Proactively identify and mitigate portfolio risks, detect market manipulation, and automate regulatory reporting with unparalleled accuracy.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Automated Market Intelligence",
    description: "Instantly synthesize earnings calls, SEC filings, and global news feeds into actionable intelligence, freeing up your analysts for high-value tasks.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Algorithmic Strategy Development",
    description: "Rapidly prototype, backtest, and deploy complex trading strategies. Our platform accelerates the entire R&D lifecycle for algorithmic trading.",
    color: "from-orange-500 to-red-500",
  },
];

const workflowSteps = [
    {
        icon: DatabaseZap,
        title: "Ingest Unstructured Data",
        description: "Connect seamlessly to any data source: market data feeds, news APIs, research papers, satellite imagery, and more."
    },
    {
        icon: BrainCircuit,
        title: "AI Core Processing",
        description: "Our proprietary models analyze, correlate, and find hidden patterns across all your data in real-time."
    },
    {
        icon: BarChart3,
        title: "Generate Actionable Alpha",
        description: "Receive high-confidence signals, risk assessments, and market forecasts delivered directly to your dashboard or API."
    },
];

const testimonial = {
    quote: "Gradies's ability to process alternative data has given us a verifiable edge. We're identifying alpha in places our competitors aren't even looking. It's become the cornerstone of our quant strategy.",
    name: "Dr. Julian Thorne",
    title: "Head of Quantitative Strategy, Blackwood Capital",
    image: "/images/user-finance.jpg", // Replace with a suitable image
};

export default function FinancePage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- HERO ANIMATION ---
      gsap.from("#finance-hero-header", { autoAlpha: 0, y: 50, duration: 1, ease: 'power3.out' });
      gsap.from("#finance-hero-p", { autoAlpha: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from("#finance-hero-buttons", { autoAlpha: 0, y: 20, duration: 1, delay: 0.4, ease: 'power3.out' });

      // --- SOLUTIONS CARDS ANIMATION ---
      gsap.from(".solution-card", {
        autoAlpha: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#solutions-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
      
      // --- WORKFLOW ANIMATION ---
      const workflowItems = gsap.utils.toArray('.workflow-item');
      gsap.from(workflowItems, {
          autoAlpha: 0,
          x: -50,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
              trigger: "#workflow-section",
              start: "top 70%",
              toggleActions: "play none none none",
          }
      });
      gsap.from(".workflow-arrow", {
          autoAlpha: 0,
          scale: 0.5,
          stagger: 0.2,
          delay: 0.4,
          scrollTrigger: {
              trigger: "#workflow-section",
              start: "top 70%",
              toggleActions: "play none none none",
          }
      });

      // --- TESTIMONIAL ANIMATION ---
      gsap.from("#testimonial-card", {
        autoAlpha: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#testimonial-card",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
      
      // --- CTA ANIMATION ---
      gsap.from("#cta-section > *", {
        autoAlpha: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#cta-section",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black text-white overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-16 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-16 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24 space-y-24 lg:space-y-32">
        {/* --- Section 1: Hero --- */}
        <section className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30">
            Use Case: Financial Markets
          </Badge>
          <h1 id="finance-hero-header" className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
              AI-Powered Alpha
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Redefining Financial Intelligence
            </span>
          </h1>
          <p id="finance-hero-p" className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            Gradies provides hedge funds, asset managers, and investment banks with a decisive analytical edge. Turn market noise into actionable signals and navigate volatility with unprecedented clarity.
          </p>
          <div id="finance-hero-buttons" className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg">
                Request a Demo
                <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 px-8 py-4 text-lg bg-transparent">
                Contact Sales
            </Button>
          </div>
        </section>

        {/* --- Section 2: Solutions --- */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">A Complete Toolkit for Modern Finance</h2>
            <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">From signal generation to risk management, our platform covers the entire investment lifecycle.</p>
          </div>
          <div id="solutions-grid" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {financeSolutions.map((solution) => (
              <Card key={solution.title} className="solution-card bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2 group">
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

        {/* --- Section 3: Workflow Visualization --- */}
        <section id="workflow-section">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold">From Data to Decision in Milliseconds</h2>
                <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">Our intelligent pipeline transforms raw, complex data into clear, actionable financial insights.</p>
            </div>
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
                {workflowSteps.map((step, index) => (
                    <React.Fragment key={step.title}>
                        <div className="workflow-item flex flex-col items-center text-center w-full lg:w-1/3 p-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center mb-6">
                                <step.icon className="w-10 h-10 text-purple-300"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-gray-300">{step.description}</p>
                        </div>
                        {index < workflowSteps.length - 1 && (
                            <div className="workflow-arrow hidden lg:block">
                                <ArrowRight className="w-12 h-12 text-gray-600" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>

        {/* --- Section 4: Testimonial --- */}
        <section>
             <div id="testimonial-card" className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/30 via-black/30 to-blue-900/30 rounded-2xl border border-purple-500/20 p-8 lg:p-12 shadow-2xl shadow-purple-500/10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={120}
                        height={120}
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-purple-500/50 flex-shrink-0"
                    />
                    <div className="text-center lg:text-left">
                        <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed italic mb-6">"{testimonial.quote}"</p>
                        <h4 className="font-semibold text-lg text-white">{testimonial.name}</h4>
                        <p className="text-purple-300">{testimonial.title}</p>
                    </div>
                </div>
             </div>
        </section>

        {/* --- Section 5: Security & CTA --- */}
        <section id="cta-section" className="text-center max-w-3xl mx-auto">
            <Bot className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Deploy with Uncompromising Security
            </h2>
            <p className="text-lg text-gray-300 mb-8">
                Your data's integrity is our priority. Gradies offers flexible deployment options, including on-premise and private cloud, ensuring your proprietary information remains fully secure and compliant with all regulations.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 px-8 py-4 text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Discuss Security Options
            </Button>
        </section>
      </div>
    </div>
  );
}