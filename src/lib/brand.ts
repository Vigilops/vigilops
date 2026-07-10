// @polsia:user-owned — brand identity. Edit freely. `site.ts` re-exports
// siteName/siteDescription; `manifest.ts` + `opengraph-image.tsx` read `brandVisual`.

export const siteName = 'VigilOps';
export const siteDescription = 'AI agent that finds, fixes, and alerts — autonomously.';

// PWA + social-share colors. HEX only (the oklch() tokens in globals.css aren't
// readable here) — set to match your brand seed.
export const brandVisual = {
  /** PWA browser-UI / status-bar color. */
  themeColor: '#0d9488',
  /** PWA splash + install background. */
  backgroundColor: '#0a0a0a',
  /** Social-share (OG/Twitter) image. */
  og: {
    background: '#0a0a0a',
    foreground: '#ffffff',
    /** Second line under the site name; '' hides it. */
    tagline: 'AI agent that finds, fixes, and alerts — autonomously.',
  },
} as const;
