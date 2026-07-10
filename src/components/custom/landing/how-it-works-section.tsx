// @polsia:user-owned

'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const STEPS = [
  {
    step: '01',
    title: 'Connect Your Repositories',
    description:
      'Link your GitHub account and select the public repositories you want VigilOps to monitor. Our OAuth integration takes under a minute — no credentials to manage, no SSH keys to rotate.',
  },
  {
    step: '02',
    title: 'VigilOps Watches 24/7',
    description:
      'Once active, VigilOps continuously queries vulnerability databases and GitHub Advisories. Every new disclosure is matched against your dependency tree instantly.',
  },
  {
    step: '03',
    title: 'AI Analyzes and Prioritizes',
    description:
      'For each vulnerability detected, VigilOps performs reachability analysis — mapping CVE data against your actual code paths to rank exploits by real-world risk.',
  },
  {
    step: '04',
    title: 'Patch PR Opens Automatically',
    description:
      'The AI generates a minimal, targeted patch for the specific vulnerable function. A clean PR is opened on your repo with the fix, a description, and references to the CVE.',
  },
  {
    step: '05',
    title: 'Your Team Gets Notified',
    description:
      'A Slack message lands in your team channel: vulnerability found, patch ready, one-click review link. No more pasting CVEs into chat or chasing down owners.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-section-lg">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: sticky copy */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <Badge variant="outline" className="w-fit text-sm">
              How It Works
            </Badge>
            <h2 className="font-display text-h1 tracking-tight text-foreground">
              From zero to patched — without touching anything
            </h2>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              VigilOps is built for teams that can&apos;t afford to manually track vulnerabilities
              across dozens of repositories. Five steps, fully automated.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-primary">01</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Connect GitHub</p>
                  <p className="text-sm text-muted-foreground">OAuth, takes under a minute</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-primary">02</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Monitor &amp; detect</p>
                  <p className="text-sm text-muted-foreground">24/7 vulnerability scanning</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-primary">03</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Analyze &amp; prioritize</p>
                  <p className="text-sm text-muted-foreground">Reachability-aware ranking</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-primary">04</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Auto-patch &amp; notify</p>
                  <p className="text-sm text-muted-foreground">PR + Slack in one shot</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col gap-4">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {STEPS.map((step, index) => (
                <AccordionItem
                  key={step.step}
                  value={`item-${index}`}
                  className="border-b border-border last:border-0"
                >
                  <AccordionTrigger className="py-5 text-left">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground">{step.step}</span>
                      <span className="text-base font-medium text-foreground">{step.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                      {step.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
