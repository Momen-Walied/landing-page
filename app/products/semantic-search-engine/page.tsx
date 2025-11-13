"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
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
  Rocket,
  Database,
  Languages,
  Brain,
  Filter
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SemanticSearchEnginePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-orange-300 hover:text-orange-200 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Info */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Semantic Search Engine
                  </h1>
                  <p className="text-gray-400 text-lg">Intelligent Knowledge Discovery</p>
                </div>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Advanced multilingual semantic search that understands context and intent, delivering highly relevant results from vast scientific literature databases. Go beyond keywords to discover knowledge.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-orange-600/20 text-orange-300 border-orange-500/30 px-4 py-2">Search</Badge>
                <Badge className="bg-red-600/20 text-red-300 border-red-500/30 px-4 py-2">Multilingual</Badge>
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2">Semantic AI</Badge>
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2">Knowledge Graph</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500/50 text-orange-300 hover:bg-orange-600/20 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Source
                </Button>
              </div>
            </div>

            {/* Product Demo/GIF Area */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-xl border border-orange-500/30 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gradient-to-br from-orange-600/20 to-red-600/20 flex items-center justify-center">
                    <div className="text-center">
                      <Search className="w-24 h-24 text-orange-400 mx-auto mb-4 animate-pulse" />
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
          <div className="flex space-x-8 border-b border-orange-500/20 mb-12">
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
                    ? "text-orange-300 border-orange-400"
                    : "text-gray-400 border-transparent hover:text-orange-300"
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
                      icon: Brain,
                      title: "Semantic Understanding",
                      description: "AI-powered comprehension of context, meaning, and research intent"
                    },
                    {
                      icon: Languages,
                      title: "Multilingual Support",
                      description: "Search across 50+ languages with automatic translation capabilities"
                    },
                    {
                      icon: Database,
                      title: "Vast Knowledge Base",
                      description: "Access to millions of research papers, patents, and scientific documents"
                    },
                    {
                      icon: Filter,
                      title: "Advanced Filtering",
                      description: "Sophisticated filters by date, field, methodology, and relevance"
                    },
                    {
                      icon: Target,
                      title: "Precision Results",
                      description: "Highly accurate results ranked by semantic relevance and quality"
                    },
                    {
                      icon: Zap,
                      title: "Lightning Fast",
                      description: "Sub-second search results across massive scientific databases"
                    }
                  ].map((feature, index) => (
                    <Card key={index} className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <feature.icon className="w-12 h-12 text-orange-400 mb-4" />
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
                  { label: "Documents Indexed", value: "127M+" },
                  { label: "Languages Supported", value: "50+" },
                  { label: "Daily Searches", value: "2.4M+" },
                  { label: "Accuracy Rate", value: "96.8%" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
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
                    title: "Advanced Search Algorithms",
                    description: "State-of-the-art semantic search powered by transformer models",
                    features: ["Vector similarity search", "Contextual embeddings", "Query expansion", "Relevance ranking"]
                  },
                  {
                    title: "Knowledge Graph Integration",
                    description: "Connected knowledge discovery through relationship mapping",
                    features: ["Entity recognition", "Concept linking", "Citation networks", "Research trends"]
                  },
                  {
                    title: "Multi-modal Search",
                    description: "Search across text, images, tables, and structured data",
                    features: ["Image search", "Table extraction", "Formula recognition", "Data visualization"]
                  }
                ].map((section, index) => (
                  <Card key={index} className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-xl border border-orange-500/20">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold text-white mb-4">{section.title}</h3>
                      <p className="text-gray-300 mb-6">{section.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-orange-400" />
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
                <p className="text-xl text-gray-300">Flexible access to the world's knowledge</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Academic",
                    price: "$29/month",
                    description: "Perfect for individual researchers",
                    features: ["1,000 searches/month", "Basic filters", "Export results", "Email support"]
                  },
                  {
                    name: "Professional",
                    price: "$99/month",
                    description: "Advanced features for research teams",
                    features: ["Unlimited searches", "Advanced analytics", "API access", "Priority support", "Custom alerts"],
                    popular: true
                  },
                  {
                    name: "Enterprise",
                    price: "Custom",
                    description: "Complete solution for organizations",
                    features: ["Private deployment", "Custom indexing", "Advanced security", "Dedicated support", "Training included"]
                  }
                ].map((plan, index) => (
                  <Card key={index} className={`bg-gradient-to-br backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? "from-orange-900/40 to-red-900/40 border-orange-400/60 ring-2 ring-orange-400/30" 
                      : "from-orange-900/20 to-red-900/20 border-orange-500/20"
                  }`}>
                    <CardContent className="p-8 text-center">
                      {plan.popular && (
                        <Badge className="bg-orange-600 text-white mb-4">Most Popular</Badge>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                        {plan.price}
                      </div>
                      <p className="text-gray-300 mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-orange-400" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500">
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
                    title: "Search Guide",
                    description: "Master advanced search techniques and operators",
                    link: "#"
                  },
                  {
                    title: "API Reference",
                    description: "Complete API documentation with code examples",
                    link: "#"
                  },
                  {
                    title: "Research Methodology",
                    description: "Best practices for systematic literature reviews",
                    link: "#"
                  },
                  {
                    title: "Data Sources",
                    description: "Explore our comprehensive database coverage",
                    link: "#"
                  }
                ].map((resource, index) => (
                  <Card key={index} className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{resource.title}</h3>
                      <p className="text-gray-300 mb-4">{resource.description}</p>
                      <Button variant="outline" className="border-orange-500/50 text-orange-300 hover:bg-orange-600/20">
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
