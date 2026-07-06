import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative mx-auto w-56 h-56 mb-6">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/60 via-[oklch(0.72_0.18_290)]/40 to-accent/40 border-4 border-ink shadow-[6px_6px_0_0_var(--ink)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)", textShadow: "4px 4px 0 var(--background)" }}>404</div>
          </div>
          <div className="absolute -top-3 -right-3 px-2 h-6 rounded-full bg-destructive text-destructive-foreground border-2 border-ink text-[10px] font-mono uppercase tracking-widest flex items-center rotate-6">Signal lost</div>
        </div>
        <h2 className="text-2xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>This shard doesn't exist.</h2>
        <p className="mt-2 text-sm text-ink/60">You wandered off Realm-7. Head back to base and try a different door.</p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <Link to="/" className="inline-flex items-center justify-center px-5 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest">Landing page</Link>
          <Link to="/create" className="inline-flex items-center justify-center px-5 h-10 rounded-full bg-white text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest">Open the studio</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative mx-auto w-56 h-56 mb-6">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-destructive/40 via-[oklch(0.75_0.20_50)]/40 to-primary/40 border-4 border-ink shadow-[6px_6px_0_0_var(--ink)]" />
          <div className="absolute inset-0 flex items-center justify-center text-7xl">⚡</div>
          <div className="absolute -top-3 -left-3 px-2 h-6 rounded-full bg-ink text-background border-2 border-ink text-[10px] font-mono uppercase tracking-widest flex items-center -rotate-6">System crash</div>
        </div>
        <h2 className="text-2xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>Something broke on our end.</h2>
        <p className="mt-2 text-sm text-ink/60 font-mono max-w-md mx-auto">{error.message || "Uncaught render error"}</p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center px-5 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest"
          >Try again</button>
          <a href="/" className="inline-flex items-center justify-center px-5 h-10 rounded-full bg-white text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pixels Studio — Build, share, earn inside Pixels." },
      { name: "description", content: "Browser-based game creation suite inside the Pixels world. Ship from a template, publish to the Hub, keep 60% of every $PIXEL." },
      { name: "author", content: "Pixels Studio" },
      { name: "theme-color", content: "#F0EDFF" },
      { property: "og:title", content: "Pixels Studio — Build games inside Pixels" },
      { property: "og:description", content: "Templates, a visual editor, and a built-in audience. Make it, publish it, get paid in $PIXEL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@pixels_online" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,700;1,9..40,900;1,9..40,1000&family=JetBrains+Mono:wght@400;500;700&family=Press+Start+2P&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
