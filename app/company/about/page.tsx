"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gem, Lightbulb, Target, Users, Bot, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Data for the page ---

// Data for the new "Path of Progress" timeline
const progressData = [
  {
    date: '18 AUG 2023',
    title: 'Grok-0',
    description: 'We finished training our first flagship model, Grok-0, which is a 33B parameter dense transformer architecture.',
    active: true, // To highlight the current or most recent significant milestone
  },
  {
    date: 'Q1 2024',
    title: 'Grok-1 Training',
    description: 'The next iteration, Grok-1, completes its training phase, showcasing significant advancements in reasoning and problem-solving.',
  },
  {
    date: 'Q3 2024',
    title: 'Next-Gen Cluster',
    description: 'Construction begins on our next-generation supercomputer, designed to train models orders of magnitude more complex.',
  },
  {
    date: 'Q1 2025',
    title: 'Alpha Access Program',
    description: 'We will grant early access to our most advanced models to a select group of research and enterprise partners.',
  },
  {
    date: '2025 & Beyond',
    title: 'Solving Grand Challenges',
    description: 'Harnessing our full computational power to help solve some of the most intractable problems facing humanity.',
  },
];

const leadershipData = [
  {
    name: "Dr. Evelyn Reed",
    title: "Co-Founder & CEO",
    image: "/images/leader-1.jpg", // Replace with your image paths
    bio: "A visionary in computational linguistics, Evelyn drives the company's mission to merge AI with human-centric research methodologies.",
    linkedin: "#",
  },
  {
    name: "Ben Carter",
    title: "Co-Founder & CTO",
    image: "/images/leader-2.jpg",
    bio: "The architectural mastermind behind our AI platform, Ben leads our engineering team to build scalable and powerful solutions.",
    linkedin: "#",
  },
  {
    name: "Maria Gonzalez",
    title: "Head of Research",
    image: "/images/leader-3.jpg",
    bio: "With a Ph.D. in Machine Learning, Maria spearheads our R&D, pushing the boundaries of what our AI can achieve.",
    linkedin: "#",
  },
  {
    name: "Dr. Kenji Tanaka",
    title: "Chief AI Ethicist",
    image: "/images/leader-4.jpg",
    bio: "Ensuring our technology is developed responsibly, Kenji's work is crucial to building trust and long-term value.",
    linkedin: "#",
  },
    {
    name: "Aisha Khan",
    title: "VP of Product",
    image: "/images/leader-5.jpg",
    bio: "Aisha translates complex user needs into elegant, intuitive features that define the Gradies experience.",
    linkedin: "#",
  },
];

const journeyMilestones = [
  { year: "2021", title: "The Spark", description: "Gradies is founded by Dr. Reed and Ben Carter with a mission to revolutionize research workflows." },
  { year: "2022", title: "Platform Alpha", description: "The first version of our AI Research Assistant is deployed with a select group of university partners." },
  { year: "2023", title: "Seed Funding Secured", description: "We raise $15M to expand our team and accelerate the development of our core technologies." },
  { year: "2024", title: "Public Launch", description: "Gradies launches globally, empowering thousands of researchers and innovators across all industries." },
  { year: "Future", title: "Autonomous Discovery", description: "Our vision is to empower AI agents to conduct independent research, unlocking new frontiers of science." },
];

const valuesData = [
    { icon: Target, title: "Purpose-Driven", description: "We are obsessed with solving real-world research challenges." },
    { icon: Lightbulb, title: "Pioneering Innovation", description: "We constantly push the boundaries of AI and user experience." },
    { icon: Gem, title: "Uncompromising Quality", description: "We build robust, reliable, and ethically sound technology." },
    { icon: Users, title: "Collaborative Spirit", description: "We believe the best ideas are born from teamwork and open discussion." },
];

export default function AboutPage() {
    const mainRef = useRef(null);
    const journeyPathRef = useRef<SVGPathElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // --- GSAP ANIMATION FOR THE NEW PROGRESS TIMELINE ---
            const milestones = gsap.utils.toArray('.progress-milestone');
            gsap.from(milestones, {
                autoAlpha: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#progress-section",
                    start: "top 70%",
                    toggleActions: "play none none none",
                }
            });


            // --- GSAP ANIMATION FOR THE JOURNEY TIMELINE ---
            const path = journeyPathRef.current;
            if (path) {
                const pathLength = path.getTotalLength();
                gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

                gsap.to(path, {
                    strokeDashoffset: 0,
                    scrollTrigger: {
                        trigger: "#journey-section",
                        start: "top center",
                        end: "bottom bottom",
                        scrub: 1.5,
                    }
                });
            }

            const journeyCards = gsap.utils.toArray('.milestone-card');
            journeyCards.forEach(milestone => {
                gsap.from(milestone, {
                    autoAlpha: 0,
                    y: 50,
                    scrollTrigger: {
                        trigger: milestone,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                });
            });

            // --- GSAP ANIMATION FOR LEADERSHIP CARDS ---
            const leadershipCards = gsap.utils.toArray('.leader-card');
            gsap.from(leadershipCards, {
                autoAlpha: 0,
                x: -50,
                stagger: 0.1,
                 scrollTrigger: {
                    trigger: "#leadership-section",
                    start: "top 70%",
                    toggleActions: "play none none none",
                }
            })

        }, mainRef);

        return () => ctx.revert();
    }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black text-white overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24 space-y-24 lg:space-y-40">
        {/* --- Section 1: Hero / Mission --- */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent">
              The Minds Behind the Mission
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            Gradies was born from a simple yet profound belief: the future of human progress is intertwined with our ability to harness artificial intelligence. We are a team of researchers, engineers, and dreamers dedicated to building the tools that will accelerate discovery and empower the next generation of innovators.
          </p>
        </section>

        {/* --- Section 2: Path of Progress (with hover animation) --- */}
        <section id="progress-section" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto mb-16 px-4">
                 <div className="lg:col-span-1">
                    <h2 className="text-3xl lg:text-5xl font-bold">Our path of progress</h2>
                 </div>
                 <div className="lg:col-span-2">
                    <p className="text-lg text-gray-300">
                        We're moving toward a future where we <span className="text-purple-400">will</span> harness our cluster's full power to solve intractable problems. What's one seemingly impossible question you'd answer for humanity?
                    </p>
                 </div>
            </div>

            <div className="relative w-full overflow-x-auto pb-8 scrollbar-hide">
                <div className="absolute top-[4.5rem] left-0 h-0.5 w-full bg-gray-700/50" />
                {/* MODIFICATION: Added `items-start` for better alignment on hover */}
                <div className="inline-flex items-start space-x-8 sm:space-x-12 px-8 lg:px-16">
                    {progressData.map((item) => (
                        // MODIFICATION: Added `group` to this parent div to enable group-hover
                        <div key={item.title} className="progress-milestone group flex flex-col items-center pt-8 w-64 flex-shrink-0 cursor-pointer">
                            {/* Timeline Node */}
                            <div className="relative w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${item.active ? 'bg-purple-400' : 'bg-gray-500 group-hover:bg-purple-400'}`} />
                                {item.active && <div className="absolute w-4 h-4 rounded-full bg-purple-400/30 animate-pulse" />}
                            </div>
                            
                            {/* Milestone Content */}
                            <div className="text-center mt-6">
                                <p className="font-mono text-sm text-gray-400 mb-2">{item.date}</p>
                                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                                {/* 
                                  MODIFICATION START: Classes for hover animation
                                  - `max-h-0`: Hides the element by collapsing its height
                                  - `opacity-0`: Makes it transparent
                                  - `group-hover:max-h-40`: On hover, sets a max-height large enough for the content
                                  - `group-hover:opacity-100`: On hover, makes it fully visible
                                  - `overflow-hidden`: Prevents content from spilling out during transition
                                  - `transition-all duration-500 ease-in-out`: Defines the smooth animation
                                */}
                                <p className="text-gray-400 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                                    {item.description}
                                </p>
                                {/* MODIFICATION END */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- Section 3: The Company Story (Original) --- */}
        <section id="journey-section" className="relative">
            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold">Our Company Story</h2>
                <p className="text-lg text-gray-400 mt-4">From a spark of an idea to a global platform.</p>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
                <svg width="100%" height="100%" viewBox="0 0 400 900" preserveAspectRatio="none" className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-[200px] pointer-events-none">
                    <defs>
                        <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                    <path
                        ref={journeyPathRef}
                        d="M 200,0 V 100 C 200,150 100,150 100,200 V 300 C 100,350 300,350 300,400 V 500 C 300,550 100,550 100,600 V 700 C 100,750 200,750 200,800 V 900"
                        fill="none"
                        stroke="url(#journeyGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>

                <div className="space-y-16">
                    {journeyMilestones.map((item, index) => (
                        <div key={item.year} className={`milestone-card flex items-center w-full ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                            <div className={`w-full lg:w-5/12 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                                <p className="text-blue-400 font-bold text-lg mb-2">{item.year}</p>
                                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- Section 4: Leadership --- */}
        <section id="leadership-section">
            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold">Meet the Leadership</h2>
                <p className="text-lg text-gray-400 mt-4">The driving force behind our innovation.</p>
            </div>
            
            <div className="flex space-x-8 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {leadershipData.map((leader, index) => (
                    <div key={index} className="leader-card snap-center flex-shrink-0 w-[300px] md:w-[350px]">
                        <Card className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                           <div className="relative">
                               <Image src={leader.image} alt={leader.name} width={400} height={400} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                               <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="text-2xl font-bold text-white">{leader.name}</h3>
                                    <p className="text-purple-300 font-semibold">{leader.title}</p>
                               </div>
                           </div>
                           <div className="p-6">
                               <p className="text-gray-300 mb-4">{leader.bio}</p>
                               <Button variant="ghost" size="sm" asChild className="text-blue-400 hover:text-white hover:bg-blue-500/10">
                                   <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                                       <Linkedin className="w-4 h-4 mr-2" />
                                       View on LinkedIn
                                   </a>
                               </Button>
                           </div>
                        </Card>
                    </div>
                ))}
                 <div className="flex-shrink-0 w-1 snap-center"></div>
            </div>
        </section>

        {/* --- Section 5: Our Values --- */}
        <section>
             <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold">Our Core Values</h2>
                <p className="text-lg text-gray-400 mt-4">The principles that guide every decision we make.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {valuesData.map((value) => (
                    <div key={value.title} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center flex flex-col items-center">
                        <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                           <value.icon className="w-8 h-8 text-purple-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                        <p className="text-gray-300 flex-grow">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* --- Section 6: Join Us CTA --- */}
         <section className="text-center max-w-3xl mx-auto">
             <Bot className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Help Us Build the Future
            </h2>
            <p className="text-lg text-gray-300 mb-8">
                We're always looking for talented and passionate individuals to join our team. If our mission resonates with you, we'd love to hear from you.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg">
                View Open Positions
            </Button>
        </section>
      </div>
    </div>
  );
}