"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  Brain,
  FileText,
  Users,
  Search,
  BookOpen,
  Newspaper,
  Video,
  Info,
  Briefcase,
  Mail,
  Building,
  FlaskConical,
  HeartPulse,
  Banknote,
  GraduationCap,
  Globe,
} from "lucide-react"

// --- Data definitions ---

const platformItems: { title: string; href: string; description: string; icon: React.ElementType }[] = [
  {
    title: "AI Research Assistant",
    href: "/products/ai-assistant",
    description: "Discover insights, analyze data, and generate hypotheses with an intelligent research companion.",
    icon: Brain,
  },
  {
    title: "Smart Grant Proposals",
    href: "/products/grant-proposals",
    description: "Automate proposal writing with AI-powered content generation and compliance checking.",
    icon: FileText,
  },
  {
    title: "Live Collaboration",
    href: "/products/collaboration",
    description: "A real-time workspace with AI-enhanced communication and project management for teams.",
    icon: Users,
  },
  {
    title: "Semantic Search",
    href: "/products/semantic-search",
    description: "Advanced, context-aware search capabilities across multilingual scientific literature.",
    icon: Search,
  },
]

const solutionsByIndustry: { title: string; href: string; description: string; icon: React.ElementType }[] = [
    { title: "Healthcare", href: "/use-cases/industry/healthcare", description: "Enhance diagnostic accuracy and patient data analysis.", icon: HeartPulse },
    { title: "Finance", href: "/use-cases/industry/finance", description: "Power algorithmic trading and market research.", icon: Banknote },
    { title: "Academia", href: "/use-cases/industry/academia", description: "Support students and faculty in literature reviews.", icon: GraduationCap },
]

const solutionsByRole: { title: string; href:string; description: string; icon: React.ElementType }[] = [
    { title: "Researchers", href: "/use-cases/function/researchers", description: "For scientists and academics pushing boundaries.", icon: FlaskConical },
    { title: "Analysts", href: "/use-cases/function/analysts", description: "For data analysts seeking deeper, faster insights.", icon: Search },
    { title: "R&D Teams", href: "/use-cases/function/rd-teams", description: "For corporate R&D teams driving innovation.", icon: Building },
]

const resourcesItems: { title: string; href: string; description: string; icon: React.ElementType }[] = [
    { title: "Blog", href: "/resources/blog", description: "Read our latest articles and company updates.", icon: Newspaper },
    { title: "Documentation", href: "/resources/docs", description: "Browse in-depth guides and API references.", icon: BookOpen },
    { title: "Webinars", href: "/resources/webinars", description: "Watch on-demand webinars and product demos.", icon: Video },
]

const companyItems: { title: string; href: string; description: string; icon: React.ElementType }[] = [
    { title: "About Us", href: "/company/about", description: "Learn more about our mission and our team.", icon: Info },
    { title: "Careers", href: "/company/careers", description: "Explore open positions and join our team.", icon: Briefcase },
    { title: "Contact", href: "/company/contact", description: "Get in touch with sales or support.", icon: Mail },
]


export function Navbar() {
  const getTriggerClass = () => "bg-transparent text-gray-300 hover:text-white focus:text-white data-[active]:text-white data-[state=open]:text-white h-auto py-2"

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-screen-xl mx-4 sm:mx-6">
        <nav className="relative flex items-center justify-between h-20 px-4 sm:px-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg shadow-purple-500/10 animate-fade-in-down">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/Gradies-logo.png" alt="Gradies Logo" width={60} height={60} className="w-16 h-16" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Gradies
              </span>
            </Link>

            <div className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Platform */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={getTriggerClass()}>
                      Platform
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg">
                        {platformItems.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                            icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Solutions */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={getTriggerClass()}>
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] grid-cols-2 gap-x-8 p-6 bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-white mb-3 pl-3 text-sm tracking-wider uppercase">By Industry</h3>
                          <ul className="space-y-1">
                            {solutionsByIndustry.map((item) => (
                                <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>{item.description}</ListItem>
                            ))}
                          </ul>
                        </div>
                        <div>
                           <h3 className="font-semibold text-white mb-3 pl-3 text-sm tracking-wider uppercase">By Role</h3>
                           <ul className="space-y-1">
                            {solutionsByRole.map((item) => (
                                <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>{item.description}</ListItem>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  {/* Resources */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={getTriggerClass()}>
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                       <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[350px] bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg">
                        {resourcesItems.map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>{item.description}</ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  {/* Company */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={getTriggerClass()}>
                      Company
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                       <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[350px] bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg">
                        {companyItems.map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>{item.description}</ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Pricing */}
                  <NavigationMenuItem>
                    <Link href="/pricing" legacyBehavior passHref>
                      <NavigationMenuLink className={cn(getTriggerClass(), "group inline-flex w-max items-center justify-center rounded-md px-4 font-medium")}>
                        Pricing
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full">
                Book a call
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10 hidden sm:inline-flex">
                <Globe className="w-5 h-5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href || "#"}
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-4">
             <div className="p-2 rounded-md bg-white/5 bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                <Icon className="h-5 w-5 text-purple-200" />
             </div>
            <div>
                <div className="text-sm font-medium leading-none text-white">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-gray-400 mt-1">
                    {children}
                </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"