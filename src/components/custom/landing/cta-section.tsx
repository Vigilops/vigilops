// @polsia:user-owned

'use client';

import { ArrowRight, Github, Slack } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-section-lg relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,var(--primary)_15%,transparent_70%)]"
      />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center flex flex-col gap-6">
          <h2 className="font-display text-h1 tracking-tight text-foreground">
            Stop chasing vulnerabilities. Start fixing them.
          </h2>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            VigilOps runs 24/7 so your team doesn&apos;t have to. Connect your GitHub, get patch PRs
            and Slack alerts — and watch your security debt disappear.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="gap-2 shadow-brand">
              <a href="mailto:hello@vigilops.io">
                Get started free
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="mailto:hello@vigilops.io">
                <Github className="size-4" aria-hidden />
                Book a demo
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <title>Open source badge</title>
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
              <span>Free for open source</span>
            </div>
            <div className="flex items-center gap-2">
              <Slack className="size-4" aria-hidden />
              <span>Slack-native alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="size-4" aria-hidden />
              <span>GitHub-native PRs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
