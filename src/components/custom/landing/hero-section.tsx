// @polsia:user-owned

'use client';

import { ArrowRight, Github, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteName } from '@/lib/site';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-section-lg">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[size:40px_40px] [background-image:radial-gradient(var(--border)_1px,transparent_1px)]"
      />
      {/* Radial fade from center */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--primary)_10%,transparent_60%)]"
      />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit gap-2 text-sm px-4 py-1.5">
              <Shield className="size-3.5 text-primary" aria-hidden />
              <span>Autonomous Security Agent</span>
            </Badge>

            <div className="flex flex-col gap-4">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-foreground">
                {siteName}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-display leading-snug">
                AI agent that finds, fixes, and alerts — autonomously.
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              VigilOps continuously monitors public GitHub repositories for dependency
              vulnerabilities, auto-generates patch pull requests, and notifies maintainers via
              Slack — all without human intervention.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="gap-2 shadow-brand">
                <a href="mailto:hello@vigilops.io">
                  Start Free
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Github className="size-4" aria-hidden />
                <span>GitHub-native</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <title>Slack icon</title>
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                </svg>
                <span>Slack alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <title>24/7 availability icon</title>
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8-1.2-2.4-2.8-4.8-6-4.8-4 0-6.8 2.8-6.8 7.6 0 6 6.8 10.4 12.8 16.4 6-6 12.8-10.4 12.8-16.4 0-4.8-2.8-7.6-6.8-7.6z" />
                </svg>
                <span>24/7 autonomous</span>
              </div>
            </div>
          </div>

          {/* Right: terminal visual */}
          <div className="relative">
            <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-[var(--destructive)]" />
                  <div className="size-3 rounded-full bg-border" />
                  <div className="size-3 rounded-full bg-primary/40" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">vigilops scan</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-mono">live</span>
                </div>
              </div>
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground shrink-0 mt-0.5">$</span>
                  <div>
                    <p className="text-foreground">vigilops monitor --repo owner/project</p>
                    <p className="text-muted-foreground mt-1">Connecting to GitHub API...</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground shrink-0 mt-0.5">$</span>
                  <div>
                    <p className="text-foreground">Scanning dependencies...</p>
                    <p className="text-primary mt-1">✓ lodash@4.17.20 — CVE-2021-23337 detected</p>
                    <p className="text-muted-foreground mt-2">Generating patch PR...</p>
                    <p className="text-primary mt-1">✓ PR #847 opened: patch-lodash-CVE-2021</p>
                    <p className="text-muted-foreground mt-2">Notifying via Slack...</p>
                    <p className="text-primary mt-1">
                      ✓ @channel: Vulnerability patched in owner/project
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground shrink-0 mt-0.5">$</span>
                  <div>
                    <p className="text-foreground">vigilops status</p>
                    <p className="text-muted-foreground mt-1">All clear. Monitoring 3 repos.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-lg border border-border bg-card shadow-lg px-4 py-3 flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="size-5 text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">3 vulnerabilities</p>
                <p className="text-xs text-muted-foreground">patched this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
