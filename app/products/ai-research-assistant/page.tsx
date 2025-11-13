"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  ArrowLeft,
  Play,
  Download,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  Github,
  ExternalLink,
  BarChart3,
  Lightbulb,
  Target,
  Rocket
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AIResearchAssistantPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Info */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    AI Research Assistant
                  </h1>
                  <p className="text-gray-400 text-lg">Intelligent Research Companion</p>
                </div>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Advanced AI-powered research companion that helps scientists and researchers accelerate their discoveries through intelligent data analysis, hypothesis generation, and automated literature reviews.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">AI/ML</Badge>
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2">Research</Badge>
                <Badge className="bg-green-600/20 text-green-300 border-green-500/30 px-4 py-2">Data Analysis</Badge>
                <Badge className="bg-orange-600/20 text-orange-300 border-orange-500/30 px-4 py-2">NLP</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Source
                </Button>
              </div>
            </div>

            {/* Product Demo/GIF Area */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="w-24 h-24 text-purple-400 mx-auto mb-4 animate-pulse" />
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
          <div className="flex space-x-8 border-b border-purple-500/20 mb-12">
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
                    ? "text-purple-300 border-purple-400"
                    : "text-gray-400 border-transparent hover:text-purple-300"
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
                      icon: Lightbulb,
                      title: "Hypothesis Generation",
                      description: "AI generates research hypotheses based on existing literature and data patterns"
                    },
                    {
                      icon: BarChart3,
                      title: "Data Analysis",
                      description: "Advanced statistical analysis and pattern recognition in research datasets"
                    },
                    {
                      icon: Globe,
                      title: "Literature Review",
                      description: "Automated scanning and summarization of scientific papers and publications"
                    },
                    {
                      icon: Target,
                      title: "Research Planning",
                      description: "Strategic research roadmap generation with milestone tracking"
                    },
                    {
                      icon: Shield,
                      title: "Quality Assurance",
                      description: "Automated fact-checking and citation verification"
                    },
                    {
                      icon: Rocket,
                      title: "Collaboration Tools",
                      description: "Real-time collaboration features for research teams"
                    }
                  ].map((feature, index) => (
                    <Card key={index} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
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
                  { label: "Research Papers Analyzed", value: "2.4M+" },
                  { label: "Active Researchers", value: "12.8K+" },
                  { label: "Hypotheses Generated", value: "847K+" },
                  { label: "Success Rate", value: "94.7%" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
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
                    title: "Natural Language Processing",
                    description: "Advanced NLP capabilities for understanding and processing scientific literature",
                    features: ["Multi-language support", "Context-aware analysis", "Semantic understanding", "Citation extraction"]
                  },
                  {
                    title: "Machine Learning Models",
                    description: "State-of-the-art ML models trained on scientific datasets",
                    features: ["Pattern recognition", "Predictive analytics", "Anomaly detection", "Trend analysis"]
                  },
                  {
                    title: "Integration Capabilities",
                    description: "Seamless integration with existing research tools and databases",
                    features: ["API access", "Database connectors", "Export formats", "Third-party plugins"]
                  }
                ].map((section, index) => (
                  <Card key={index} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/20">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold text-white mb-4">{section.title}</h3>
                      <p className="text-gray-300 mb-6">{section.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
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
                <p className="text-xl text-gray-300">Flexible pricing for researchers and institutions</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Researcher",
                    price: "Free",
                    description: "Perfect for individual researchers",
                    features: ["5 projects", "Basic AI analysis", "Community support", "Export to PDF"]
                  },
                  {
                    name: "Professional",
                    price: "$29/month",
                    description: "Advanced features for serious research",
                    features: ["Unlimited projects", "Advanced AI models", "Priority support", "API access", "Team collaboration"],
                    popular: true
                  },
                  {
                    name: "Institution",
                    price: "Custom",
                    description: "Enterprise solution for organizations",
                    features: ["Custom deployment", "Dedicated support", "Advanced security", "Custom integrations", "Training included"]
                  }
                ].map((plan, index) => (
                  <Card key={index} className={`bg-gradient-to-br backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? "from-purple-900/40 to-blue-900/40 border-purple-400/60 ring-2 ring-purple-400/30" 
                      : "from-purple-900/20 to-blue-900/20 border-purple-500/20"
                  }`}>
                    <CardContent className="p-8 text-center">
                      {plan.popular && (
                        <Badge className="bg-purple-600 text-white mb-4">Most Popular</Badge>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        {plan.price}
                      </div>
                      <p className="text-gray-300 mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
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
                    title: "Getting Started Guide",
                    description: "Complete walkthrough for new users",
                    link: "#"
                  },
                  {
                    title: "API Documentation",
                    description: "Comprehensive API reference and examples",
                    link: "#"
                  },
                  {
                    title: "Tutorials & Examples",
                    description: "Step-by-step tutorials and use cases",
                    link: "#"
                  },
                  {
                    title: "Community Forum",
                    description: "Connect with other researchers and get help",
                    link: "#"
                  }
                ].map((resource, index) => (
                  <Card key={index} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{resource.title}</h3>
                      <p className="text-gray-300 mb-4">{resource.description}</p>
                      <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20">
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
