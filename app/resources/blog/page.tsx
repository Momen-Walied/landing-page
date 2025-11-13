"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Mock Data for Blog Posts ---
const blogPosts = [
  {
    id: 1,
    title: "The Architecture of Grok-1: A Deep Dive",
    image: "/images/blog-1.jpg", // Replace with your image paths
    excerpt: "Explore the novel transformer architecture and mixture-of-experts model that gives our flagship AI its unprecedented capabilities.",
    authorName: "Dr. Evelyn Reed",
    authorImage: "/images/leader-1.jpg",
    date: "October 26, 2024",
    category: "AI Research",
    featured: true,
  },
  {
    id: 2,
    title: "Scaling Trust: Our Approach to AI Ethics and Safety",
    image: "/images/blog-2.jpg",
    excerpt: "Building powerful AI comes with immense responsibility. Here’s how we're embedding ethical principles into every stage of development.",
    authorName: "Dr. Kenji Tanaka",
    authorImage: "/images/leader-4.jpg",
    date: "October 15, 2024",
    category: "Ethics",
  },
  {
    id: 3,
    title: "From Petabytes to Insights: The Data Engine Behind Our Models",
    image: "/images/blog-3.jpg",
    excerpt: "An inside look at the data processing pipelines and infrastructure required to train foundation models at a global scale.",
    authorName: "Ben Carter",
    authorImage: "/images/leader-2.jpg",
    date: "September 28, 2024",
    category: "Engineering",
  },
  {
    id: 4,
    title: "The Future of Human-Computer Collaboration",
    image: "/images/blog-4.jpg",
    excerpt: "We believe AI is a tool to augment human intellect, not replace it. Discover the product philosophy that guides our user-centric design.",
    authorName: "Aisha Khan",
    authorImage: "/images/leader-5.jpg",
    date: "September 12, 2024",
    category: "Product & Vision",
  },
];

const featuredPost = blogPosts.find(p => p.featured);
const regularPosts = blogPosts.filter(p => !p.featured);

export default function BlogPage() {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("#blog-header", {
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out',
            });
            
            gsap.from("#featured-post", {
                autoAlpha: 0,
                y: 50,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: "#featured-post",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            const cards = gsap.utils.toArray('.blog-post-card');
            gsap.from(cards, {
                autoAlpha: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.6,
                scrollTrigger: {
                    trigger: "#latest-articles-grid",
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
        <div className="absolute top-1/4 -right-16 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24 space-y-24 lg:space-y-32">
        {/* --- Section 1: Hero --- */}
        <section id="blog-header" className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-white bg-clip-text text-transparent">
              From Our Lab to Your Screen
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            Insights, research, and announcements from the frontiers of artificial intelligence.
          </p>
        </section>

        {/* --- Section 2: Featured Post --- */}
        {featuredPost && (
            <section id="featured-post">
                <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">Featured Article</h2>
                <Link href={`/blog/${featuredPost.id}`} passHref>
                  <Card className="group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer lg:flex">
                    <div className="lg:w-1/2">
                        <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            width={800}
                            height={500}
                            className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <p className="text-sm font-semibold text-purple-400 mb-2 flex items-center">
                            <Tag className="w-4 h-4 mr-2" />
                            {featuredPost.category}
                        </p>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{featuredPost.title}</h3>
                        <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                        <div className="flex items-center text-sm text-gray-400 mt-auto">
                            <Image src={featuredPost.authorImage} alt={featuredPost.authorName} width={40} height={40} className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <p className="font-semibold text-white">{featuredPost.authorName}</p>
                                <p>{featuredPost.date}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 ml-auto text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                        </div>
                    </div>
                  </Card>
                </Link>
            </section>
        )}
        
        {/* --- Section 3: Latest Articles Grid --- */}
        <section>
            <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
            <div id="latest-articles-grid" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`} passHref>
                        <Card className="blog-post-card group h-full flex flex-col bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 cursor-pointer">
                            <div className="relative">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <p className="text-xs font-semibold text-purple-400 mb-2 flex items-center"><Tag className="w-3 h-3 mr-1.5" />{post.category}</p>
                                <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                                <p className="text-gray-400 text-sm flex-grow mb-6">{post.excerpt}</p>
                                <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-white/10">
                                    <User className="w-4 h-4 mr-2" />
                                    <span>{post.authorName}</span>
                                    <span className="mx-2">·</span>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{post.date}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}