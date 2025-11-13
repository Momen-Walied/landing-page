"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  role: z.string().max(120).optional().or(z.literal("")),
  useCase: z.string().max(2000).optional().or(z.literal("")),
})

type FormValues = z.infer<typeof FormSchema>

export default function EarlyAccessPage() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      useCase: "",
    },
    mode: "onBlur",
  })

  async function onSubmit(values: FormValues) {
    try {
      setSubmitting(true)
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      toast({
        title: "Thanks!",
        description:
          "We received your request. A confirmation email is on its way to your inbox.",
      })
      form.reset()
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message ?? "Please try again later.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Explore our solutions — Early Access
          </h1>
          <p className="mt-3 text-slate-300">
            Tell us a bit about you and your goals. We’ll share next steps and
            a tailored demo via email.
          </p>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role / Title <span className="text-slate-400">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Head of Research" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="useCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Use Case / Interest <span className="text-slate-400">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="e.g., Automate literature reviews; evaluate custom LLM for domain-specific QA; build data pipeline..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {submitting ? "Submitting..." : "Request early access"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          By submitting this form, you agree to be contacted about Gradies products and
          services. You can unsubscribe at any time.
        </p>
      </div>
    </main>
  )
}
