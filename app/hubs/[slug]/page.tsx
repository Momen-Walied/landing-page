import { hubCards } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// This tells Next.js to pre-render all these pages at build time for speed and SEO.
export async function generateStaticParams() {
  return hubCards.map((hub) => ({
    slug: hub.id,
  }))
}

export default function HubDetailPage({ params }: { params: { slug: string } }) {
  const hub = hubCards.find((h) => h.id === params.slug)

  // If no hub is found for the slug, show a 404 page.
  if (!hub) {
    notFound()
  }

  const Icon = hub.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D1A] to-[#24143A] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Hubs
          </Link>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${hub.color} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{hub.title}</h1>
                <p className="text-lg text-purple-300 font-medium">{hub.tagline}</p>
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {hub.description}
            </p>

            <h3 className="text-2xl font-semibold text-white mb-4">Key Features</h3>
            <div className="space-y-4 mb-10">
              {hub.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                  <span className="text-base text-gray-400 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className={`px-6 py-3 rounded-lg bg-gradient-to-r ${hub.color} text-white font-semibold shadow-lg hover:opacity-95 transition`}>
                Get Started with {hub.title}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}