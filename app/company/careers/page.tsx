"use client";

import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Telescope, Zap, Shield, ChevronRight, Briefcase, MapPin, SquareArrowOutUpRight, Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// --- Data for the page (easy to update) ---
const benefitsData = [
  { icon: Rocket, title: "Mission-Driven Impact", description: "Your work will directly contribute to accelerating scientific and technological breakthroughs." },
  { icon: BrainCircuit, title: "Intellectual Freedom", description: "We encourage deep thinking and provide the autonomy to explore novel ideas and approaches." },
  { icon: Zap, title: "Rapid Growth & Learning", description: "Be surrounded by top-tier talent and have access to resources that fuel your professional development." },
  { icon: Shield, title: "Comprehensive Well-being", description: "Exceptional health benefits, wellness stipends, and a remote-first culture that respects your work-life harmony." },
];

const valuesData = [
    {
        title: "Integrity",
        description: "We build with uncompromising honesty and transparency. Our commitment to ethical AI is the bedrock of the trust our users place in us. Every line of code and every decision reflects this core principle.",
        image: "/images/value-integrity.jpg" // Abstract image of light/glass
    },
    {
        title: "Teamwork",
        description: "We are a collective of specialists united by a shared mission. We foster a culture of open dialogue, mutual respect, and psychological safety, believing that diverse perspectives lead to the most robust solutions.",
        image: "/images/value-teamwork.jpg" // People collaborating in a modern space
    },
    {
        title: "Respect",
        description: "We respect the ambition of our users, the expertise of our colleagues, and the global impact of our work. This manifests in creating intuitive products and maintaining a supportive internal environment.",
        image: "/images/value-respect.jpg" // A calm, focused individual
    },
    {
        title: "Pioneering",
        description: "We are not here to follow; we are here to lead. We embrace calculated risks, challenge established norms, and relentlessly pursue the 'what if' to redefine the boundaries of AI-powered research.",
        image: "/images/value-pioneering.jpg" // Abstract image of forward motion/exploration
    }
];

const jobData = [
  { id: 1, title: "Senior AI Research Scientist", department: "Research", location: "Remote" },
  { id: 2, title: "Lead Frontend Engineer (React/Next.js)", department: "Engineering", location: "Remote (EU/US)" },
  { id: 3, title: "Product Manager - AI Platforms", department: "Product", location: "Remote (US)" },
  { id: 4, title: "Distributed Systems Engineer (Go/Rust)", department: "Engineering", location: "Remote" },
  { id: 5, title: "Machine Learning Engineer", department: "Research", location: "Remote" },
];

export default function CareersPage() {
    const [activeValue, setActiveValue] = useState(valuesData[0]);
    const [jobFilter, setJobFilter] = useState('All');
    const mainRef = useRef(null);
    const valueImageRef = useRef(null);

    const filteredJobs = jobData.filter(job => jobFilter === 'All' || job.department === jobFilter);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate hero
            gsap.from(".hero-line", { y: 50, autoAlpha: 0, stagger: 0.2, duration: 1, ease: 'power3.out' });
            
            // Animate office gallery
            gsap.from(".gallery-item", {
                autoAlpha: 0,
                y: 50,
                scale: 0.95,
                stagger: 0.1,
                scrollTrigger: { trigger: "#office-gallery", start: "top 80%" }
            });

            // Animate benefits section
            gsap.from(".benefit-item", {
                autoAlpha: 0,
                x: -50,
                stagger: 0.15,
                scrollTrigger: { trigger: "#benefits-section", start: "top 70%" }
            });

            // Animate values section
             gsap.from("#values-section .section-header, #values-section .values-list, #values-section .value-display", {
                autoAlpha: 0,
                y: 40,
                stagger: 0.2,
                scrollTrigger: { trigger: "#values-section", start: "top 70%" }
            });
            
        }, mainRef);
        return () => ctx.revert();
    }, []);

    // Animate the value image/text when activeValue changes
    useEffect(() => {
        if (valueImageRef.current) {
            gsap.fromTo(valueImageRef.current, { autoAlpha: 0.5, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.inOut' });
        }
    }, [activeValue]);

    return (
        <div ref={mainRef} className="relative bg-black text-white overflow-x-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 space-y-24 lg:space-y-40 pb-24">
                {/* --- Section 1: Hero --- */}
                <section className="relative w-full h-[60vh] lg:h-[80vh] flex items-center justify-center">
                    <Image
                        src="/images/career-hero.jpg" // Use an abstract, aspirational image
                        alt="Aspirational workspace"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="relative z-10 text-center px-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                            <span className="hero-line block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Your Dream Job</span>
                            <span className="hero-line block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">is Here.</span>
                        </h1>
                        <p className="hero-line text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mt-6">
                            This isn't just a career. It's a chance to be at the forefront of the AI revolution, solving problems that will define the next decade.
                        </p>
                    </div>
                </section>

                {/* --- Section 2: Office Pictures --- */}
                <section className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold mb-4">A Space for Innovation</h2>
                        <p className="text-lg text-gray-400">Empowering the teams who build game-changing technology.</p>
                    </div>
                    <div id="office-gallery" className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        <div className="gallery-item md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden"><Image src="/images/office-1.jpg" alt="Office 1" width={800} height={800} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                        <div className="gallery-item rounded-2xl overflow-hidden"><Image src="/images/office-2.jpg" alt="Office 2" width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                        <div className="gallery-item rounded-2xl overflow-hidden"><Image src="/images/office-3.jpg" alt="Office 3" width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                        <div className="gallery-item rounded-2xl overflow-hidden"><Image src="/images/office-4.jpg" alt="Office 4" width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                        <div className="gallery-item rounded-2xl overflow-hidden"><Image src="/images/office-5.jpg" alt="Office 5" width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                    </div>
                </section>

                {/* --- Section 3: Benefits --- */}
                <section id="benefits-section" className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="text-left">
                            <p className="text-lg font-semibold text-blue-400 mb-2">BENEFITS</p>
                            <h2 className="text-4xl lg:text-6xl font-bold">
                                <span className="block">Reasons</span>
                                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">to Join Us</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {benefitsData.map(perk => (
                                <div key={perk.title} className="benefit-item bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                                    <perk.icon className="w-8 h-8 text-purple-300 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">{perk.title}</h3>
                                    <p className="text-gray-400">{perk.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* --- Section 4: Our Values --- */}
                <section id="values-section" className="container mx-auto px-6">
                     <div className="text-center max-w-3xl mx-auto mb-16 section-header">
                        <h2 className="text-3xl lg:text-5xl font-bold mb-4">Our Values</h2>
                        <p className="text-lg text-gray-400">The principles that guide our mission and our team.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <div className="lg:col-span-1 values-list flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 space-x-4 lg:space-x-0 lg:space-y-4">
                            {valuesData.map(value => (
                                <button
                                    key={value.title}
                                    onClick={() => setActiveValue(value)}
                                    className={cn(
                                        "w-full p-4 rounded-xl text-left transition-all duration-300 flex-shrink-0 lg:flex-shrink",
                                        activeValue.title === value.title ? "bg-white/10 border border-purple-500" : "bg-transparent border border-transparent hover:bg-white/5"
                                    )}
                                >
                                    <span className="text-xl font-bold">{value.title}</span>
                                </button>
                            ))}
                        </div>
                        <div className="lg:col-span-2 value-display relative h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-white/10">
                            <Image
                                ref={valueImageRef}
                                src={activeValue.image}
                                alt={activeValue.title}
                                key={activeValue.title} // Re-trigger image load on change
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <p className="text-lg text-gray-200 max-w-xl">{activeValue.description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Section 5: Job Listings --- */}
                 <section className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold mb-4">Open Positions</h2>
                    </div>
                     <div className="flex justify-center flex-wrap gap-4 mb-12">
                        {['All', 'Engineering', 'Research', 'Product'].map(dep => (
                            <Button key={dep} onClick={() => setJobFilter(dep)} className={cn("transition-all duration-300 border-0", jobFilter === dep ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20')}>{dep}</Button>
                        ))}
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4 hover:border-purple-500/50 transition-colors">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <Badge variant="outline" className="border-blue-500/50 text-blue-300"><Briefcase className="w-3 h-3 mr-1" />{job.department}</Badge>
                                        <Badge variant="outline" className="border-green-500/50 text-green-300"><MapPin className="w-3 h-3 mr-1" />{job.location}</Badge>
                                    </div>
                                </div>
                                <Button variant="ghost" className="flex-shrink-0 text-gray-300 hover:text-white group"><ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></Button>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* --- Section 6: Learn More --- */}
                <section className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold mb-4">Learn more about us</h3>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">Dive deeper into our mission, team, and the journey that brought us here.</p>
                     <Button size="lg" asChild className="bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                         <a href="/company/about">
                             Our Story <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
                         </a>
                     </Button>
                </section>
            </div>
        </div>
    );
}