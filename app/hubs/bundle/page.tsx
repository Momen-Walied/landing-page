import { hubCards } from "@/lib/data"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Briefcase, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// This page is specific to the 'bundle', so we can hardcode our logic.
export default function BundlePage() {
  const bundle = hubCards.find((h) => h.id === "bundle")
  
  // Find the hubs that are included in the bundle
  const includedHubIds = ["marketing", "sales", "service", "crm"]
  const includedHubs = hubCards.filter(hub => includedHubIds.includes(hub.id))

  if (!bundle) return null // Or a custom error component

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#24143A] to-[#0D0D1A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Hubs
          </Link>
        </div>

        {/* Custom Hero Section for the Bundle */}
        <div className="text-center mb-16">
          <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${bundle.color} flex items-center justify-center mb-6`}>
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <p className="font-bold text-amber-300 mb-2">{bundle.badge}</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{bundle.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {bundle.description}
          </p>
        </div>

        {/* Custom "What's Included" Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-10">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedHubs.map(hub => {
              const Icon = hub.icon
              return (
                <Card key={hub.id} className="bg-gray-900/50 border border-white/10 text-center p-6 rounded-xl">
                  <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-r ${hub.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{hub.title}</h3>
                </Card>
              )
            })}
          </div>
        </div>
        
        {/* Custom Pricing / CTA Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950/50 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/50">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-8 h-8 mx-auto text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Get the Complete Solution</h3>
              <p className="text-5xl font-extrabold text-white mb-2">
                $149<span className="text-xl font-medium text-gray-400">/mo</span>
              </p>
              <p className="text-gray-400 mb-6">Billed annually. Perfect for growing teams.</p>
              
              <button className={`w-full px-8 py-4 rounded-lg bg-gradient-to-r ${bundle.color} text-white font-bold text-lg shadow-lg hover:opacity-90 transition`}>
                Start Your Free Trial
              </button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}