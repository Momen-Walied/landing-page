import {
    FileText,
    Brain,
    Table,
    Edit3,
    Video,
    Users,
    Bot,
    FileCode2,
  } from "lucide-react"
  
  // Define a type for a single hub object for better type safety
  export type Hub = {
    id: string
    icon: React.ElementType
    title: string
    tagline: string
    description: string
    features: string[]
    color: string
    badge?: string
  }

  // Eight research/education focused cards
  export const hubCards: Hub[] = [
    {
      id: "paper-understanding",
      icon: FileText,
      title: "Paper Understanding",
      tagline: "Research Agent",
      description: "Understands academic PDFs — sections, methods, datasets, figures, and limitations.",
      features: ["Reference linking", "Method & dataset extraction"],
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      id: "knowledge-graph",
      icon: Brain,
      title: "Knowledge Graph",
      tagline: "AI-Native",
      description: "Links entities, hypotheses, and datasets into a living research graph.",
      features: ["Entity linking", "Relation discovery"],
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "data-extraction",
      icon: Table,
      title: "Data Extraction",
      tagline: "Research Agent",
      description: "Turns tables, figures and numeric results into clean CSV/JSON ready for analysis.",
      features: ["Multi-column parsing", "Units normalization"],
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "online-editor",
      icon: Edit3,
      title: "Online Editor",
      tagline: "Workspace",
      description: "Write, cite and synthesize in a distraction-free collaborative editor.",
      features: ["Grounded citations", "BibTeX export"],
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "video-calls",
      icon: Video,
      title: "Video Calls",
      tagline: "Communication",
      description: "Meet with your team and advisors with shared context from your workspace.",
      features: ["Agenda & notes", "Highlights & action items"],
      color: "from-teal-500 to-emerald-500",
    },
    {
      id: "collaborations",
      icon: Users,
      title: "Collaborations with Teams and Supervisors",
      tagline: "Teams & Supervisors",
      description: "Work together — comments, tasks, and shared libraries across your projects.",
      features: ["Real-time presence", "Permissions & roles"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "multi-agents",
      icon: Bot,
      title: "Multi Agents Research and Insights",
      tagline: "Research & Insights",
      description: "Specialized agents coordinate to explore topics and surface insights with sources.",
      features: ["Topic clustering", "Source-grounded answers"],
      color: "from-rose-500 to-orange-500",
      badge: "Beta",
    },
    {
      id: "paper2code",
      icon: FileCode2,
      title: "Paper2code",
      tagline: "Developer Agent",
      description: "Translate methodology into runnable code templates and notebooks.",
      features: ["Cite-as-you-code", "Export to GitHub"],
      color: "from-indigo-500 to-purple-500",
      badge: "New",
    },
  ]