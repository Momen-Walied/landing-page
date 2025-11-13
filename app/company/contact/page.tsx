import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, SendHorizonal, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Connect With Us
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300">
            Have a question, a project proposal, or just want to say hello? We'd love to hear from you. Reach out and let's create the future of research together.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Direct Contact Info (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-white">Get in Touch Directly</h2>
            
            <div className="space-y-6">
              <InfoItem icon={Mail} title="Email Us" description="Our team is here to help." link="mailto:contact@Gradies.com" linkText="contact@Gradies.com" />
              <InfoItem icon={Phone} title="Call Us" description="Mon-Fri from 9am to 5pm." link="tel:+1234567890" linkText="+1 (234) 567-890" />
              <InfoItem icon={MapPin} title="Our Headquarters" description="123 Innovation Drive, Tech City, 10101" />
            </div>

            {/* THE NEW MAP VISUALIZATION */}
            <div className="relative h-64 w-full rounded-2xl border border-white/10 overflow-hidden shadow-lg shadow-blue-500/10 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.342920824339!2d-73.98801282436789!3d40.754439134913754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9a9715875%3A0x67a3c9b74432a214!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full [filter:invert(1)_hue-rotate(200deg)_brightness(0.8)_contrast(1.2)]"
              ></iframe>
               <a 
                href="https://www.google.com/maps/place/Times+Square" // Replace with your direct Google Maps link
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                  <div className="text-center text-white p-4 rounded-lg bg-black/50 backdrop-blur-sm">
                    <ExternalLink className="mx-auto h-8 w-8 mb-2" />
                    <span className="font-semibold">View on Google Maps</span>
                  </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send Us a Message</CardTitle>
                <CardDescription className="text-gray-400">Fill out the form and we'll get back to you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-gray-300">First Name</Label>
                    <Input id="first-name" placeholder="Alisha" className="bg-black/20 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-gray-300">Last Name</Label>
                    <Input id="last-name" placeholder="Reed" className="bg-black/20 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input id="email" type="email" placeholder="alisha.reed@example.com" className="bg-black/20 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your project or inquiry..." className="bg-black/20 border-gray-700 text-white min-h-[120px] focus:ring-purple-500 focus:border-purple-500" />
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 text-lg">
                  <SendHorizonal className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// A helper component to keep the info items DRY
const InfoItem = ({ icon: Icon, title, description, link, linkText }: {
    icon: React.ElementType,
    title: string,
    description: string,
    link?: string,
    linkText?: string
}) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center border border-white/10">
      <Icon className="w-6 h-6 text-purple-300" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
      {link && linkText && (
        <a href={link} className="text-blue-400 hover:text-blue-300 transition-colors duration-300 block mt-1">
          {linkText}
        </a>
      )}
    </div>
  </div>
);