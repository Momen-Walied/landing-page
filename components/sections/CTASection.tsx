"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Crown, ShieldCheck, Sparkles, ArrowRight, Phone, Briefcase, Layers } from 'lucide-react'

export default function CTAWorkWithUsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-zinc-950 to-black text-white overflow-hidden">
      {/* Lux background accents */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -left-40 -top-32 w-[800px] h-[800px] rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,215,64,0.12), transparent 20%)' }} />
        <div className="absolute right-0 bottom-0 w-[700px] h-[700px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle at 70% 70%, rgba(139,92,246,0.10), transparent 20%)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black/20 to-transparent opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-bold shadow">C</div>
            <div className="text-lg font-semibold tracking-tight">Gradies</div>
            <span className="ml-3 px-2 py-1 text-xs rounded-full bg-white/5 text-slate-300">AI Solutions</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#results" className="hover:text-white">Results</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="#" className="px-3 py-1 rounded-lg bg-white/6">Sign in</a>
          </nav>
        </header>

        {/* Work-With-Us Hero */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold leading-tight">
              Build real-world AI that <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">moves your business forward</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 0.95, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="mt-6 text-slate-300 max-w-lg">
              Custom models, reliable deployment, and operational excellence — we partner with product teams and enterprises to design, build and run AI systems that deliver measurable impact.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.16 }} className="mt-8 flex items-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold shadow-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-black">
                Talk to our AI experts
                <ArrowRight size={16} />
              </a>

              <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">Schedule a free consultation</a>
            </motion.div>

            {/* Value badges */}
            <div className="mt-8 flex gap-4 flex-wrap">
              <Badge icon={<Briefcase size={16} />} title="Tailored Solutions">From POC to production-grade systems.</Badge>
              <Badge icon={<ShieldCheck size={16} />} title="Secure & Compliant">Governance, auditability, and best practices.</Badge>
              <Badge icon={<Sparkles size={16} />} title="Operational Excellence">Monitoring, SLOs & runbooks included.</Badge>
            </div>

            <div className="mt-6 text-sm text-slate-400 max-w-md">
              <div className="mb-2">Typical engagements:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Custom model development & fine-tuning</li>
                <li>API integration & model serving at scale</li>
                <li>Architecture review, SLO tuning & runbook delivery</li>
              </ul>
            </div>
          </div>

          {/* Visual showcase: project card */}
          <div className="relative flex items-center justify-center">
            <motion.div initial={{ rotateY: 12, scale: 0.98, opacity: 0.95 }} animate={{ rotateY: 0, scale: 1, opacity: 1 }} transition={{ duration: 0.9 }} className="w-[520px] max-w-full">
              <div className="rounded-3xl p-6 bg-gradient-to-br from-black/40 to-white/2 border border-white/6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center text-black font-bold shadow">P</div>
                    <div>
                      <div className="font-semibold">Sample Engagement</div>
                      <div className="text-sm text-slate-400">6–12 week project • end-to-end</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold">Enterprise-grade</div>
                    <div className="text-sm text-slate-400">Production-ready delivery</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <FeatureRow title="Discovery" description="Requirements, data audit & POC plan" />
                  <FeatureRow title="Modeling" description="Custom models, fine-tuning & evaluation" />
                  <FeatureRow title="Deployment" description="Scalable serving & CI/CD" />
                  <FeatureRow title="Ops" description="Monitoring, SLOs & runbooks" />
                </div>

                <div className="flex items-center justify-between">
                  <a href="#contact" className="inline-flex items-center gap-3 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 text-black">
                    Start a project
                    <ArrowRight size={14} />
                  </a>
                  <a href="#results" className="text-sm text-slate-400">See case study</a>
                </div>

              </div>

              {/* ribbon */}
              <div className="absolute -top-4 left-6 transform -rotate-6">
                <div className="px-4 py-1 rounded-full bg-amber-400 text-black font-medium shadow">Trusted partner • Delivered</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mt-20">
          <h3 className="text-2xl font-semibold mb-6">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard title="AI System Development" icon={<Layers size={18} />} points={["Custom model building","Data pipelines & labeling","End-to-end delivery"]} />
            <ServiceCard title="Integration & MLOps" icon={<Briefcase size={18} />} points={["API & infra","Model serving & CI/CD","Observability & SLOs"]} />
            <ServiceCard title="Research & Advisory" icon={<Phone size={18} />} points={["Architecture reviews","Proof-of-concept design","Workshops & training"]} />
          </div>
        </section>


        {/* Big sticky CTA */}
        <div id="contact" className="mt-20">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl p-8 bg-gradient-to-br from-white/3 to-white/6 border border-white/6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-sm text-slate-300">Ready to start?</div>
              <div className="text-2xl font-extrabold">Let’s scope your AI project together</div>
              <div className="text-sm text-slate-400 mt-1">Free 30-minute scoping session. No obligation.</div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#contact-form" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 text-black">
                Schedule a scoping session
                <ArrowRight size={16} />
              </a>
              <a href="#contact-form" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/6">Request case studies</a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-sm text-slate-400">
          <div className="flex items-center justify-between">
            <div>© {new Date().getFullYear()} Gradies — Build with us</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

function Badge({ icon, title, children }: { icon: React.ReactNode, title: string, children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-white/3 rounded-xl p-3 md:p-4 shadow-sm">
      <div className="p-2 rounded-md bg-amber-400 text-black">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        {children && <div className="text-sm text-slate-300 mt-1">{children}</div>}
      </div>
    </div>
  )
}

function FeatureRow({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-black/30">
      <div className="w-9 h-9 rounded-md bg-white/6 flex items-center justify-center"> <Star size={16} /> </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-slate-400">{description}</div>
      </div>
    </div>
  )
}

function ServiceCard({ title, icon, points }: { title: string, icon: React.ReactNode, points: string[] }) {
  return (
    <div className="rounded-2xl p-6 bg-white/3">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-md bg-white/6">{icon}</div>
        <div className="font-semibold">{title}</div>
      </div>
      <ul className="text-sm text-slate-300 space-y-2 mb-4">
        {points.map((p) => <li key={p}>• {p}</li>)}
      </ul>
      <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/6">Learn more</a>
    </div>
  )
}

function Testimonial({ quote, name, role }: { quote: string, name: string, role: string }) {
  return (
    <motion.blockquote initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-xl p-6 bg-white/3">
      <div className="text-slate-200">“{quote}”</div>
      <div className="mt-4 font-semibold">{name}</div>
      <div className="text-sm text-slate-400">{role}</div>
    </motion.blockquote>
  )
}