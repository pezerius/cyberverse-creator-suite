import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/creator-agreement")({
  head: () => ({ meta: [{ title: "Creator agreement — Pixels Studio" }] }),
  component: CreatorPage,
});

function CreatorPage() {
  return (
    <article className="space-y-6 text-ink/80">
      <p className="text-xs font-mono uppercase tracking-widest text-ink/50">Last updated: Oct 28, 2026 · Demo copy for the Pixels Studio prototype.</p>

      <Section n="1" title="Revenue split">
        <p>Free tier keeps 60% of net revenue from your published games. Pro tier keeps 80%. Marketplace asset sales pay you 95% after the 5% platform fee.</p>
      </Section>

      <Section n="2" title="Escrow & refunds">
        <p>License purchases sit in escrow for 24 hours. Refunds are only issued for provably broken assets — style or subjective preference isn't a refund reason.</p>
      </Section>

      <Section n="3" title="Moderation">
        <p>Every upload passes an automated scan (malware + reverse-image hash) plus human review for the first 5 listings.</p>
      </Section>

      <Section n="4" title="Creator badges">
        <p>Reply to reviews within 24h, keep a 4.0+ average, and ship at least one update per quarter to keep your Verified badge.</p>
      </Section>

      <Section n="5" title="Termination for cause">
        <p>Uploading assets you don't own the rights to = immediate account termination and forfeit of pending payouts.</p>
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
