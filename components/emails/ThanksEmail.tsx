import * as React from "react"

export function ThanksEmail({
  fullName,
  role,
  useCase,
}: {
  fullName: string
  role?: string
  useCase?: string
}) {
  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#0F172A' }}>
      <div style={{ padding: '24px', background: '#0B1020', color: '#E5E7EB', borderRadius: 12 }}>
        <h1 style={{ margin: 0, fontSize: 24, color: '#F5F3FF' }}>Thanks for reaching out{fullName ? `, ${fullName}` : ''}!</h1>
        <p style={{ marginTop: 8, color: '#CBD5E1' }}>
          We’re excited that you want to explore Gradies. Here’s how we’ll move forward.
        </p>
      </div>

      <div style={{ padding: '20px 24px' }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>What happens next</h2>
        <ol style={{ paddingLeft: 18, marginTop: 8 }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Discovery (15–30 min):</strong> We’ll confirm your goals and success criteria{role ? ` for your role as ${role}` : ''}.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Tailored demo:</strong> We’ll share a short walkthrough aligned with your use case{useCase ? ` ("${useCase}")` : ''}.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Plan & next steps:</strong> You’ll receive a concise plan and timeline options.
          </li>
        </ol>

        <h3 style={{ marginTop: 16, fontSize: 16 }}>What we’ll cover</h3>
        <ul style={{ paddingLeft: 18, marginTop: 8 }}>
          <li>Where AI can deliver measurable impact in your workflow</li>
          <li>Integration approach, data considerations, and guardrails</li>
          <li>Milestones for a 4–8 week pilot to de-risk quickly</li>
        </ul>

        <p style={{ marginTop: 16 }}>
          If you have any extra context or docs to share in advance, just reply to this email.
        </p>

        <p style={{ marginTop: 16 }}>— The Gradies Team</p>
      </div>

      <div style={{ borderTop: '1px solid #E5E7EB', marginTop: 24, paddingTop: 16, color: '#64748B', fontSize: 12 }}>
        <p style={{ margin: 0 }}>Gradies • San Francisco & Remote</p>
        <p style={{ margin: '4px 0 0' }}>
          You’re receiving this because you requested early access updates.
        </p>
      </div>
    </div>
  )
}
