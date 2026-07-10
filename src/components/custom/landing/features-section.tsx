// @polsia:user-owned

'use client';

import { BarChart3, Bell, GitPullRequest, Layers, Slack, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FEATURES = [
  {
    icon: Layers,
    badge: 'Continuous',
    title: 'Always-on Monitoring',
    description:
      "Watches every public repository around the clock. New vulnerabilities surface the moment they're disclosed — no manual scans, no missed alerts.",
  },
  {
    icon: Zap,
    badge: 'Fast',
    title: 'AI-Powered Patch Generation',
    description:
      'When a CVE hits, VigilOps analyzes the vulnerable code, generates a precise fix, and opens a PR — often before most teams even know there was a problem.',
  },
  {
    icon: Bell,
    badge: 'Proactive',
    title: 'Reachability-Aware Alerts',
    description:
      'Cut through the noise. VigilOps prioritizes exploitable vulnerabilities by analyzing your code paths, so your team focuses on what actually matters.',
  },
  {
    icon: GitPullRequest,
    badge: 'Automatic',
    title: 'Pull Request Generation',
    description:
      'Every fix comes with a clean, review-ready PR. No more staring at CVE reports — the patch is done, the maintainer just needs to approve and merge.',
  },
  {
    icon: Slack,
    badge: 'Integrated',
    title: 'Slack-Native Notifications',
    description:
      'Alerts land exactly where your team works. Context-rich Slack messages with direct links to the vulnerability, the patch, and the affected repo.',
  },
  {
    icon: BarChart3,
    badge: 'Compliant',
    title: 'SBOM & CRA Readiness',
    description:
      'Stay ahead of regulatory requirements. VigilOps helps maintainers generate Software Bills of Materials and meet EU Cyber Resilience Act obligations.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-section-lg bg-muted/30">
      <div className="container-page">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <Badge variant="outline" className="text-sm">
            Features
          </Badge>
          <h2 className="font-display text-h1 tracking-tight text-foreground">
            Everything you need to stay secure
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            From detection to remediation to compliance — VigilOps handles the full lifecycle so you
            can focus on building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group lift border-border/60 bg-card hover:border-primary/30 transition-colors"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="size-5 text-primary" aria-hidden />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base font-semibold text-card-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
