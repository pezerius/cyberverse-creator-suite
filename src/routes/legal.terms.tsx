import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [{ title: "Terms of use — Pixels Studio" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="prose-legal space-y-6 text-ink/80">
      <p className="text-xs font-mono uppercase tracking-widest text-ink/50">Last updated: Oct 28, 2026 · Demo copy — replace before launch.</p>

      <Section n="1" title="The basics">
        <p>Pixels Studio is a browser-based game creation suite operated by Pixels Labs Ltd. By signing in, you agree to these terms.</p>
      </Section>

      <Section n="2" title="Your account">
        <p>You're responsible for anything that happens on your account. Keep 2FA on for withdrawals over 10,000 $PIXEL.</p>
      </Section>

      <Section n="3" title="What you make">
        <p>You own the games and assets you upload. By publishing on Pixels Studio, you grant us a non-exclusive license to host, display, and distribute your work within the platform.</p>
      </Section>

      <Section n="4" title="Marketplace conduct">
        <ul className="list-disc pl-6 space-y-1">
          <li>Only upload assets you have the right to distribute.</li>
          <li>The 5% platform fee funds moderation, hosting, and CDN delivery.</li>
          <li>Buyers get a 24-hour refund window; disputes are handled by our moderation team.</li>
        </ul>
      </Section>

      <Section n="5" title="Prohibited content">
        <p>No malware, no scraped or stolen assets, no content that would violate platform-wide community rules. Repeated violations = account termination.</p>
      </Section>

      <Section n="6" title="$PIXEL and payouts">
        <p>$PIXEL is an in-platform credit unit. Conversions to fiat or crypto are subject to fees and applicable regulations in your jurisdiction.</p>
      </Section>

      <Section n="7" title="Termination">
        <p>You can delete your account at any time. We can suspend accounts that violate these terms, with notice where possible.</p>
      </Section>

      <Section n="8" title="Changes">
        <p>We'll notify you at least 14 days before material changes take effect.</p>
      </Section>
    </article>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="italic font-black text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
        <span className="text-primary mr-2">{n}.</span>{title}
      </h2>
      <div className="text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
