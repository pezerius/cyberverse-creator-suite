import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { ArrowLeft, Upload, Music2, Palette, Grid3x3, X, Plus, Check, Info, Image as ImageIcon, DollarSign, Tag, Shield, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { AssetType, License } from "@/lib/marketplace-data";

export const Route = createFileRoute("/marketplace/list")({
  head: () => ({
    meta: [{ title: "List an asset — Pixels Studio Marketplace" }, { name: "description", content: "Upload and list a sprite, SFX pack, or tileset on the Pixels Studio marketplace." }],
  }),
  component: () => (
    <AppShell>
      <ListAssetPage />
    </AppShell>
  ),
});

const typeOptions: { value: AssetType; icon: typeof Music2; label: string; hint: string; formats: string }[] = [
  { value: "Sprites", icon: Palette, label: "Sprite pack", hint: "Characters, props, animations", formats: "PNG spritesheet + JSON" },
  { value: "SFX", icon: Music2, label: "SFX / audio", hint: "One-shots, loops, ambience", formats: "WAV or OGG · 48kHz" },
  { value: "Tileset", icon: Grid3x3, label: "Tileset", hint: "Environment tiles, terrain, decor", formats: "PNG + TSX / TMX" },
];

function ListAssetPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [type, setType] = useState<AssetType>("Sprites");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [files, setFiles] = useState<{ name: string; size: string; kind: "asset" | "preview" }[]>([
    { name: "runner_v3_sheet.png", size: "1.4 MB", kind: "asset" },
    { name: "runner_v3_animations.json", size: "48 KB", kind: "asset" },
    { name: "preview_01.png", size: "220 KB", kind: "preview" },
  ]);
  const [pricingMode, setPricingMode] = useState<"paid" | "free">("paid");
  const [priceSingle, setPriceSingle] = useState(800);
  const [licenses, setLicenses] = useState<Record<License, boolean>>({
    "Single Game": true,
    "All My Games": true,
    Resellable: false,
  });
  const [compat, setCompat] = useState<string[]>(["Pixels Studio v3+"]);
  const [dimensions, setDimensions] = useState("");
  const [version, setVersion] = useState("v1.0");
  const [agreeIp, setAgreeIp] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const priceAll = Math.round(priceSingle * 2.5);
  const priceResell = Math.round(priceSingle * 5);

  const canSubmit = title.trim().length >= 3 && description.trim().length >= 20 && files.some(f => f.kind === "asset") && agreeIp && agreeTerms;

  function addTag() {
    const t = tagInput.trim().replace(/^#/, "").toLowerCase();
    if (t && !tags.includes(t) && tags.length < 8) setTags([...tags, t]);
    setTagInput("");
  }
  function removeTag(t: string) { setTags(tags.filter(x => x !== t)); }
  function removeFile(name: string) { setFiles(files.filter(f => f.name !== name)); }
  function mockUpload(kind: "asset" | "preview") {
    const idx = files.length + 1;
    setFiles([...files, { name: `new_upload_${idx}.${kind === "preview" ? "png" : "zip"}`, size: `${(Math.random() * 3 + 0.4).toFixed(1)} MB`, kind }]);
  }

  const activeType = typeOptions.find(t => t.value === type)!;

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-accent border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] flex items-center justify-center">
          <Sparkles className="w-9 h-9" />
        </div>
        <h1 className="mt-6 italic font-black text-5xl" style={{ fontFamily: "var(--font-display)" }}>Submitted for review.</h1>
        <p className="mt-3 text-ink/70 max-w-md mx-auto">
          Our moderation crew scans every upload for malware, copyright, and prohibited content. Typical turnaround: <span className="font-bold">under 4 hours</span>. You'll get a ping when it goes live.
        </p>
        <div className="mt-6 p-4 rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] max-w-md mx-auto text-left font-mono text-xs space-y-1">
          <div className="flex justify-between"><span className="text-ink/60">Submission</span><span className="font-bold">px_sub_08421</span></div>
          <div className="flex justify-between"><span className="text-ink/60">Type</span><span className="font-bold">{type}</span></div>
          <div className="flex justify-between"><span className="text-ink/60">Title</span><span className="font-bold">{title}</span></div>
          <div className="flex justify-between"><span className="text-ink/60">Status</span><Chip tone="amber">In review</Chip></div>
        </div>
        <div className="mt-6 flex gap-2 justify-center">
          <Link to="/marketplace"><HudButton variant="secondary">Back to marketplace</HudButton></Link>
          <Link to="/profile"><HudButton variant="primary">View my listings</HudButton></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <Link to="/marketplace" className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to marketplace
      </Link>

      <SectionHeader
        eyebrow="// New listing"
        title="List an asset."
        sub="Upload once, get paid every time another creator licenses it. 95% royalty to you, 5% platform fee."
      />

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto">
        {[
          { n: 1, label: "Type & files" },
          { n: 2, label: "Details" },
          { n: 3, label: "Pricing & license" },
          { n: 4, label: "Review & publish" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setStep(s.n)}
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-full border-2 border-ink font-mono text-xs uppercase tracking-widest ${
                step === s.n ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--ink)]" : step > s.n ? "bg-accent" : "bg-white text-ink/60"
              }`}
            >
              {step > s.n ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <span className="font-black">{s.n}</span>}
              {s.label}
            </button>
            {i < 3 && <div className="w-6 h-0.5 bg-ink/20" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6">
          {step === 1 && (
            <>
              <HudCard>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// 1. Asset type</div>
                <div className="grid md:grid-cols-3 gap-3">
                  {typeOptions.map((t) => {
                    const Icon = t.icon;
                    const active = type === t.value;
                    return (
                      <button
                        key={t.value}
                        onClick={() => setType(t.value)}
                        className={`p-4 rounded-2xl border-2 border-ink text-left transition ${active ? "bg-accent shadow-[3px_3px_0_0_var(--ink)]" : "bg-white hover:bg-muted"}`}
                      >
                        <div className={`w-10 h-10 rounded-xl border-2 border-ink flex items-center justify-center mb-2 ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}><Icon className="w-5 h-5" /></div>
                        <div className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>{t.label}</div>
                        <div className="text-xs font-mono text-ink/60 mt-0.5">{t.hint}</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/40 mt-2">{t.formats}</div>
                      </button>
                    );
                  })}
                </div>
              </HudCard>

              <HudCard>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// 2. Upload files</div>
                <UploadDropzone label={`Drop your ${activeType.label.toLowerCase()} here`} hint={activeType.formats} onDrop={() => mockUpload("asset")} />

                {files.filter(f => f.kind === "asset").length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.filter(f => f.kind === "asset").map((f) => (
                      <FileRow key={f.name} name={f.name} size={f.size} onRemove={() => removeFile(f.name)} />
                    ))}
                  </div>
                )}

                <div className="mt-6 text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// 3. Preview images (up to 4)</div>
                <UploadDropzone label="Add preview screenshots" hint="PNG or JPG · at least 1200×800" small onDrop={() => mockUpload("preview")} icon={ImageIcon} />
                {files.filter(f => f.kind === "preview").length > 0 && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {files.filter(f => f.kind === "preview").map((f) => (
                      <div key={f.name} className="relative border-2 border-ink rounded-xl overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30 aspect-video flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-ink/60" />
                        <button onClick={() => removeFile(f.name)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white border-2 border-ink flex items-center justify-center"><X className="w-3 h-3" /></button>
                        <div className="absolute bottom-1 left-1 right-1 bg-ink/70 text-background text-[9px] font-mono px-1.5 py-0.5 rounded truncate">{f.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </HudCard>
            </>
          )}

          {step === 2 && (
            <HudCard>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// Asset details</div>
              <div className="space-y-4">
                <Field label="Title" hint="Keep it short and searchable — under 60 chars.">
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Chrome Alley Tileset" maxLength={60} className="w-full h-11 px-4 rounded-full bg-white border-2 border-ink font-mono text-sm outline-none focus:shadow-[2px_2px_0_0_var(--ink)]" />
                </Field>

                <Field label="Description" hint="What is it, what's in it, when should someone use it? (min 20 chars)">
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="128 hand-pixeled tiles for gritty back-alley scenes…" className="w-full p-4 rounded-2xl bg-white border-2 border-ink font-mono text-sm outline-none focus:shadow-[2px_2px_0_0_var(--ink)] resize-y" />
                  <div className="text-[10px] font-mono text-ink/50 mt-1">{description.length} chars</div>
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Dimensions / spec" hint={type === "SFX" ? "e.g. 24 clips · avg 1.6s" : "e.g. 16×16 px tiles · 128 total"}>
                    <input value={dimensions} onChange={(e) => setDimensions(e.target.value)} placeholder={type === "SFX" ? "24 clips · 48kHz" : "16×16 px · 128 tiles"} className="w-full h-11 px-4 rounded-full bg-white border-2 border-ink font-mono text-sm outline-none" />
                  </Field>
                  <Field label="Version" hint="Use semver so buyers see updates.">
                    <input value={version} onChange={(e) => setVersion(e.target.value)} className="w-full h-11 px-4 rounded-full bg-white border-2 border-ink font-mono text-sm outline-none" />
                  </Field>
                </div>

                <Field label="Tags" hint="Up to 8. Helps buyers find your asset.">
                  <div className="flex flex-wrap gap-2 items-center p-2 rounded-2xl bg-white border-2 border-ink min-h-[52px]">
                    {tags.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 px-2.5 h-7 rounded-full bg-accent border-2 border-ink font-mono text-[11px]">
                        #{t}
                        <button onClick={() => removeTag(t)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
                      placeholder={tags.length === 0 ? "cyberpunk, urban, night…" : "add another…"}
                      className="flex-1 min-w-[120px] h-8 px-2 bg-transparent outline-none font-mono text-sm"
                    />
                  </div>
                </Field>

                <Field label="Compatibility" hint="Which engines / versions does this work with?">
                  <div className="flex flex-wrap gap-2">
                    {["Pixels Studio v3+", "Pixels Studio v2", "Tiled 1.9+", "Godot 4", "Unity 2022+", "Any engine"].map((c) => {
                      const on = compat.includes(c);
                      return (
                        <button
                          key={c}
                          onClick={() => setCompat(on ? compat.filter(x => x !== c) : [...compat, c])}
                          className={`px-3 h-8 rounded-full border-2 border-ink font-mono text-[11px] uppercase tracking-widest ${on ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--ink)]" : "bg-white"}`}
                        >
                          {on && "✓ "}{c}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>
            </HudCard>
          )}

          {step === 3 && (
            <>
              <HudCard>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// Pricing model</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPricingMode("paid")}
                    className={`p-4 rounded-2xl border-2 border-ink text-left ${pricingMode === "paid" ? "bg-accent shadow-[3px_3px_0_0_var(--ink)]" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-2"><DollarSign className="w-5 h-5" /><span className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>Paid</span></div>
                    <div className="text-xs font-mono text-ink/60 mt-1">Set a price per license tier. 95% goes to you.</div>
                  </button>
                  <button
                    onClick={() => setPricingMode("free")}
                    className={`p-4 rounded-2xl border-2 border-ink text-left ${pricingMode === "free" ? "bg-accent shadow-[3px_3px_0_0_var(--ink)]" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-2"><Sparkles className="w-5 h-5" /><span className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>Free</span></div>
                    <div className="text-xs font-mono text-ink/60 mt-1">Credit-only license. Build reputation, get downloads.</div>
                  </button>
                </div>
              </HudCard>

              {pricingMode === "paid" && (
                <HudCard>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// License tiers & prices</div>
                  <div className="space-y-3">
                    <TierRow
                      name="Single Game"
                      hint="Buyer uses in one shipped game. Cheapest, most popular."
                      enabled={licenses["Single Game"]}
                      onToggle={(v) => setLicenses({ ...licenses, "Single Game": v })}
                      price={priceSingle}
                      onPrice={setPriceSingle}
                    />
                    <TierRow
                      name="All My Games"
                      hint="Buyer uses in unlimited of their own games. Not resellable."
                      enabled={licenses["All My Games"]}
                      onToggle={(v) => setLicenses({ ...licenses, "All My Games": v })}
                      price={priceAll}
                      readOnly
                    />
                    <TierRow
                      name="Resellable"
                      hint="Buyer can bundle into templates they resell. Premium tier."
                      enabled={licenses["Resellable"]}
                      onToggle={(v) => setLicenses({ ...licenses, Resellable: v })}
                      price={priceResell}
                      readOnly
                    />
                  </div>

                  <div className="mt-5 p-4 rounded-2xl bg-muted/40 border-2 border-ink/20 text-sm">
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-widest text-ink/60"><Info className="w-3.5 h-3.5" /> Payout preview per Single Game sale</div>
                    <div className="flex justify-between font-mono text-xs"><span>License price</span><span className="font-bold">{priceSingle.toLocaleString()} PX</span></div>
                    <div className="flex justify-between font-mono text-xs text-ink/60"><span>Platform fee (5%)</span><span>−{Math.round(priceSingle * 0.05).toLocaleString()} PX</span></div>
                    <div className="flex justify-between font-mono text-sm mt-1.5 pt-1.5 border-t-2 border-ink/20"><span className="font-bold">You receive</span><span className="italic font-black text-lg text-primary" style={{ fontFamily: "var(--font-display)" }}>{(priceSingle - Math.round(priceSingle * 0.05)).toLocaleString()} PX</span></div>
                  </div>
                </HudCard>
              )}
            </>
          )}

          {step === 4 && (
            <HudCard>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// Review & publish</div>
              <div className="space-y-3">
                <ReviewRow label="Type" value={type} />
                <ReviewRow label="Title" value={title || "—"} bad={title.length < 3} />
                <ReviewRow label="Description" value={description ? `${description.slice(0, 80)}${description.length > 80 ? "…" : ""}` : "—"} bad={description.length < 20} />
                <ReviewRow label="Files" value={`${files.filter(f => f.kind === "asset").length} asset · ${files.filter(f => f.kind === "preview").length} preview`} bad={!files.some(f => f.kind === "asset")} />
                <ReviewRow label="Tags" value={tags.length ? tags.map(t => `#${t}`).join(" ") : "—"} />
                <ReviewRow label="Pricing" value={pricingMode === "free" ? "Free (credit-only)" : `${priceSingle.toLocaleString()} PX starting`} />
                <ReviewRow label="Version" value={version} />
              </div>

              <div className="mt-6 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreeIp} onChange={(e) => setAgreeIp(e.target.checked)} className="mt-1 w-4 h-4 accent-primary" />
                  <span className="text-sm">I confirm I hold the full IP rights to these files, or have written permission to distribute them. <Shield className="w-3.5 h-3.5 inline text-ink/60" /></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-1 w-4 h-4 accent-primary" />
                  <span className="text-sm">I agree to the Pixels Studio creator terms — 5% platform fee, 24h refund window, moderation review.</span>
                </label>
              </div>
            </HudCard>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <HudButton variant="ghost" onClick={() => (step > 1 ? setStep(step - 1) : navigate({ to: "/marketplace" }))}>
              ← {step > 1 ? "Back" : "Cancel"}
            </HudButton>
            {step < 4 ? (
              <HudButton variant="primary" onClick={() => setStep(step + 1)}>Continue →</HudButton>
            ) : (
              <HudButton variant="primary" onClick={() => setSubmitted(true)} disabled={!canSubmit} className={!canSubmit ? "opacity-50 cursor-not-allowed" : ""}>
                Submit for review
              </HudButton>
            )}
          </div>
        </div>

        {/* Right rail: live preview */}
        <div className="space-y-4">
          <div className="sticky top-6 space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">// Live preview</div>
            <div className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-primary/40 to-accent/40 border-b-2 border-ink relative flex items-center justify-center">
                <activeType.icon className="w-10 h-10 text-ink/70" />
                <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                  <Chip>{type}</Chip>
                  {pricingMode === "free" && <Chip tone="green">Free</Chip>}
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold italic text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>{title || "Your asset title"}</div>
                <div className="mt-1 text-xs font-mono text-ink/60">by @you</div>
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((t) => <span key={t} className="text-[10px] font-mono text-ink/60">#{t}</span>)}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {pricingMode === "free" ? (
                      <div className="italic font-black text-xl text-[oklch(0.45_0.20_140)]" style={{ fontFamily: "var(--font-display)" }}>Free</div>
                    ) : (
                      <>
                        <div className="italic font-black text-xl text-primary" style={{ fontFamily: "var(--font-display)" }}>{priceSingle.toLocaleString()}</div>
                        <div className="text-[10px] font-mono uppercase text-ink/50 -mt-0.5">$PIXEL</div>
                      </>
                    )}
                  </div>
                  <div className="h-9 px-4 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center text-[10px] font-mono uppercase tracking-widest font-bold">
                    {pricingMode === "free" ? "Get" : "Buy license"}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-primary/10 border-2 border-ink/20 text-xs">
              <div className="flex items-center gap-1.5 font-mono uppercase tracking-widest text-[10px] text-ink/60 mb-2"><Info className="w-3 h-3" /> Tips</div>
              <ul className="space-y-1.5 text-ink/70">
                <li>• Bright, clear preview images convert 3× better.</li>
                <li>• Assets under 1500 PX sell 5× more copies.</li>
                <li>• Reply to reviews within 24h to keep your creator badge.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadDropzone({ label, hint, onDrop, small, icon: Icon = Upload }: { label: string; hint: string; onDrop: () => void; small?: boolean; icon?: typeof Upload }) {
  return (
    <button
      onClick={onDrop}
      className={`w-full border-2 border-dashed border-ink/40 rounded-2xl bg-muted/30 hover:bg-muted hover:border-ink transition text-center flex flex-col items-center justify-center gap-2 ${small ? "py-6" : "py-10"}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-bold">{label}</div>
      <div className="text-xs font-mono text-ink/60">{hint}</div>
      <div className="mt-2 inline-flex items-center gap-1 h-8 px-3 rounded-full bg-primary text-primary-foreground border-2 border-ink font-mono text-[10px] uppercase tracking-widest font-bold">
        <Plus className="w-3 h-3" /> Choose files
      </div>
    </button>
  );
}

function FileRow({ name, size, onRemove }: { name: string; size: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border-2 border-ink">
      <div className="w-9 h-9 rounded-xl bg-accent border-2 border-ink flex items-center justify-center shrink-0">
        <Check className="w-4 h-4" strokeWidth={3} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">{name}</div>
        <div className="text-[11px] font-mono text-ink/60">{size} · uploaded</div>
      </div>
      <button onClick={onRemove} className="w-8 h-8 rounded-full border-2 border-ink bg-white hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center"><X className="w-4 h-4" /></button>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-mono uppercase tracking-widest font-bold">{label}</label>
        {hint && <div className="text-[10px] font-mono text-ink/50">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function TierRow({ name, hint, enabled, onToggle, price, onPrice, readOnly }: { name: string; hint: string; enabled: boolean; onToggle: (v: boolean) => void; price: number; onPrice?: (v: number) => void; readOnly?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl border-2 border-ink flex items-center gap-4 ${enabled ? "bg-white" : "bg-muted/30 opacity-60"}`}>
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} className="w-4 h-4 accent-primary" />
        <div className="flex-1">
          <div className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>{name}</div>
          <div className="text-xs font-mono text-ink/60">{hint}</div>
        </div>
      </label>
      <div className="flex items-center gap-2">
        {onPrice && !readOnly ? (
          <input type="number" value={price} onChange={(e) => onPrice(Number(e.target.value))} disabled={!enabled} className="w-24 h-10 px-3 rounded-full bg-white border-2 border-ink font-mono text-sm text-right outline-none" />
        ) : (
          <div className="w-24 h-10 px-3 rounded-full bg-muted border-2 border-ink/20 font-mono text-sm flex items-center justify-end">{price.toLocaleString()}</div>
        )}
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">PX</div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value, bad }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b-2 border-ink/10 last:border-0">
      <span className="text-xs font-mono uppercase tracking-widest text-ink/60 shrink-0">{label}</span>
      <span className={`text-sm text-right ${bad ? "text-destructive font-bold" : "font-bold"}`}>{value}</span>
    </div>
  );
}
