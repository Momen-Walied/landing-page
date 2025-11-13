"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  ArrowLeft,
  Play,
  Download,
  Star,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  Github,
  ExternalLink,
  BarChart3,
  Lightbulb,
  Target,
  Rocket,
  MessageSquare,
  Video,
  FileEdit,
  Clock
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CollaborationPlatformPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Info */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Live Collaboration Platform
                  </h1>
                  <p className="text-gray-400 text-lg">Real-time Research Workspace</p>
                </div>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Real-time collaborative workspace for research teams with AI-enhanced communication, project management, and document co-authoring capabilities. Unite your team across the globe.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2">Collaboration</Badge>
                <Badge className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30 px-4 py-2">Real-time</Badge>
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">AI-Enhanced</Badge>
                <Badge className="bg-green-600/20 text-green-300 border-green-500/30 px-4 py-2">Project Management</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-600/20 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Source
                </Button>
              </div>
            </div>

            {/* Product Demo/GIF Area */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-xl border border-blue-500/30 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-24 h-24 text-blue-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-gray-400">Interactive Demo Coming Soon</p>
                      <p className="text-sm text-gray-500 mt-2">Product GIF/Video will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8 border-b border-blue-500/20 mb-12">
            {[
              { id: "overview", label: "Overview" },
              { id: "features", label: "Features" },
              { id: "pricing", label: "Pricing" },
              { id: "documentation", label: "Documentation" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 text-lg font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-300 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-blue-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeTab === "overview" && (
            <div className="space-y-16">
              {/* Key Features */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Key Capabilities</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: FileEdit,
                      title: "Real-time Co-authoring",
                      description: "Simultaneous document editing with live cursor tracking and conflict resolution"
                    },
                    {
                      icon: Video,
                      title: "Integrated Video Calls",
                      description: "Built-in video conferencing with screen sharing and recording capabilities"
                    },
                    {
                      icon: MessageSquare,
                      title: "AI-Enhanced Chat",
                      description: "Smart messaging with AI-powered suggestions and automatic translation"
                    },
                    {
                      icon: Target,
                      title: "Project Management",
                      description: "Kanban boards, task tracking, and milestone management tools"
                    },
                    {
                      icon: Shield,
                      title: "Secure Workspace",
                      description: "End-to-end encryption with enterprise-grade security protocols"
                    },
                    {
                      icon: Globe,
                      title: "Global Accessibility",
                      description: "Multi-language support with timezone-aware scheduling"
                    }
                  ].map((feature, index) => (
                    <Card key={index} className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Active Teams", value: "8.9K+" },
                  { label: "Documents Created", value: "247K+" },
                  { label: "Hours Saved", value: "1.2M+" },
                  { label: "Global Users", value: "45K+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-white">Detailed Features</h2>
              
              {/* Feature List */}
              <div className="space-y-8">
                {[
                  {
                    title: "Real-time Collaboration",
                    description: "Seamless multi-user editing and communication tools",
                    features: ["Live document editing", "Cursor tracking", "Comment system", "Version history"]
                  },
                  {
                    title: "Communication Suite",
                    description: "Integrated communication tools for seamless team interaction",
                    features: ["Video conferencing", "Voice calls", "Screen sharing", "Chat channels"]
                  },
                  {
                    title: "Project Organization",
                    description: "Comprehensive project management and organization tools",
                    features: ["Task management", "Milestone tracking", "File organization", "Progress analytics"]
                  }
                ].map((section, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/20">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold text-white mb-4">{section.title}</h3>
                      <p className="text-gray-300 mb-6">{section.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-blue-400" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
                <p className="text-xl text-gray-300">Flexible pricing for teams of all sizes</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Team",
                    price: "$19/user/month",
                    description: "Perfect for small research teams",
                    features: ["Up to 10 users", "Unlimited documents", "Basic video calls", "Email support"]
                  },
                  {
                    name: "Professional",
                    price: "$39/user/month",
                    description: "Advanced features for growing teams",
                    features: ["Unlimited users", "Advanced analytics", "HD video calls", "Priority support", "Custom integrations"],
                    popular: true
                  },
                  {
                    name: "Enterprise",
                    price: "Custom",
                    description: "Complete solution for large organizations",
                    features: ["Custom deployment", "Dedicated support", "Advanced security", "Custom branding", "Training included"]
                  }
                ].map((plan, index) => (
                  <Card key={index} className={`bg-gradient-to-br backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? "from-blue-900/40 to-cyan-900/40 border-blue-400/60 ring-2 ring-blue-400/30" 
                      : "from-blue-900/20 to-cyan-900/20 border-blue-500/20"
                  }`}>
                    <CardContent className="p-8 text-center">
                      {plan.popular && (
                        <Badge className="bg-blue-600 text-white mb-4">Most Popular</Badge>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                        {plan.price}
                      </div>
                      <p className="text-gray-300 mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-blue-400" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documentation" && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-white">Documentation & Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Team Setup Guide",
                    description: "Get your team up and running in minutes",
                    link: "#"
                  },
                  {
                    title: "Collaboration Best Practices",
                    description: "Tips for effective remote team collaboration",
                    link: "#"
                  },
                  {
                    title: "Integration Guides",
                    description: "Connect with your favorite research tools",
                    link: "#"
                  },
                  {
                    title: "Security & Privacy",
                    description: "Learn about our security measures and compliance",
                    link: "#"
                  }
                ].map((resource, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{resource.title}</h3>
                      <p className="text-gray-300 mb-4">{resource.description}</p>
                      <Button variant="outline" className="border-blue-500/50 text-blue-300 hover:bg-blue-600/20">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
