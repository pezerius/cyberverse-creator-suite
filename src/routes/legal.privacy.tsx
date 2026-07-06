import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Privacy policy — Pixels Studio" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="space-y-6 text-ink/80">
      <p className="text-xs font-mono uppercase tracking-widest text-ink/50">Last updated: Oct 28, 2026 · This page is demo copy maintained by Pixels Labs Ltd.</p>

      <Section n="1" title="What we collect">
        <ul className="list-disc pl-6 space-y-1">
          <li>Account info you give us: handle, display name, email, avatar.</li>
          <li>Usage telemetry: pages visited, feature engagement, crash reports.</li>
          <li>Marketplace activity: listings, purchases, reviews, payouts.</li>
        </ul>
      </Section>

      <Section n="2" title="What we don't do">
        <ul className="list-disc pl-6 space-y-1">
          <li>Sell your personal data to third parties.</li>
          <li>Read the contents of your unpublished drafts.</li>
        </ul>
      </Section>

      <Section n="3" title="Cookies">
        <p>Essential cookies keep you signed in. Analytics cookies are opt-in in Settings → Notifications.</p>
      </Section>

      <Section n="4" title="Your rights">
        <p>Export or delete your data any time from Settings → Profile. Requests are actioned within 30 days.</p>
      </Section>

      <Section n="5" title="Subprocessors">
        <p>We use industry-standard hosting, CDN, and payments partners. A current list is available on request.</p>
      </Section>

      <Section n="6" title="Contact">
        <p>Questions? <a className="text-primary underline" href="mailto:privacy@pixels.studio">privacy@pixels.studio</a></p>
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
