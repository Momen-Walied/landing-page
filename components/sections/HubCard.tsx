"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type { Hub } from "@/lib/data" // Import the type

// The component now accepts a 'hub' prop of type 'Hub'
export default function HubCard({ hub }: { hub: Hub }) {
  return (
    <Link href={`/hubs/${hub.id}`} className="block h-full hub-card" style={{ willChange: "transform, opacity" }}>
      <Card className="group relative overflow-visible bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 h-full rounded-2xl">
        <CardContent className="p-6 relative z-10">
          {hub.badge && (
            <div className="absolute top-4 right-4 z-20">
              <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${hub.color} text-white shadow-lg`}>
                {hub.badge}
              </span>
            </div>
          )}

          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${hub.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <hub.icon className="w-6 h-6 text-white" />
          </div>

          <div className="mb-3">
            <h3 className="text-xl font-bold text-white mb-1">{hub.title}</h3>
            <p className="text-xs text-purple-300 font-medium">{hub.tagline}</p>
          </div>

          <p className="text-gray-300 text-sm font-medium mb-4 leading-relaxed">
            {hub.description}
          </p>
          
          <div className="space-y-2 mb-4">
            {hub.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-400 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          {/* This is now just a visual cue inside the link */}
          <div className="mt-auto pt-2 text-sm text-purple-400 group-hover:text-purple-300 font-semibold flex items-center gap-2 transition-all duration-300">
            Learn more
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${hub.color} opacity-5`} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}