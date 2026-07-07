import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/login", changefreq: "monthly", priority: "0.6" },
          { path: "/studio/create", changefreq: "weekly", priority: "0.9" },
          { path: "/studio/templates", changefreq: "weekly", priority: "0.8" },
          { path: "/studio/builder", changefreq: "weekly", priority: "0.7" },
          { path: "/studio/dashboard", changefreq: "weekly", priority: "0.7" },
          { path: "/hub", changefreq: "daily", priority: "0.9" },
          { path: "/marketplace", changefreq: "weekly", priority: "0.8" },
          { path: "/profile", changefreq: "weekly", priority: "0.6" },
          { path: "/pro", changefreq: "monthly", priority: "0.7" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
