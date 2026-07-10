// @polsia:user-owned

'use client';

import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PLANS = [
  {
    name: 'Starter',
    badge: null,
    description: 'For open-source maintainers with a few critical repos.',
    price: 'Free',
    period: '',
    cta: 'Get started',
    ctaHref: 'mailto:hello@vigilops.io',
    features: [
      'Up to 3 public repositories',
      'Daily vulnerability scan',
      'Patch PR generation',
      'Slack notifications',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    badge: 'Popular',
    description: 'For dev teams managing multiple projects with real security needs.',
    price: '$49',
    period: '/ month',
    cta: 'Start free trial',
    ctaHref: 'mailto:hello@vigilops.io',
    features: [
      'Unlimited public repositories',
      'Real-time vulnerability monitoring',
      'AI-powered patch generation',
      'Reachability-aware prioritization',
      'Slack + email alerts',
      'PR status dashboard',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    badge: null,
    description: 'For organizations that need compliance reporting and SLA guarantees.',
    price: 'Custom',
    period: '',
    cta: 'Contact us',
    ctaHref: 'mailto:enterprise@vigilops.io',
    features: [
      'Everything in Pro',
      'SBOM generation',
      'EU CRA compliance reports',
      'Private repository support',
      'Dedicated Slack channel',
      'Custom alert routing',
      'SLA guarantee',
      'Onboarding & training',
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-section-lg bg-muted/30">
      <div className="container-page">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <Badge variant="outline" className="text-sm">
            Pricing
          </Badge>
          <h2 className="font-display text-h1 tracking-tight text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Start free, scale as you grow. No seat limits, no surprise charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col lift border-border/60 bg-card ${
                plan.badge ? 'border-primary/40 shadow-brand' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="shadow-sm">{plan.badge}</Badge>
                </div>
              )}
              <CardHeader className="pb-4 pt-6">
                <CardTitle className="text-xl font-bold text-card-foreground">
                  {plan.name}
                </CardTitle>
                {plan.description && (
                  <CardDescription className="text-sm mt-1">{plan.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold font-display text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                </div>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" aria-hidden />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button asChild className="w-full" variant={plan.badge ? 'default' : 'outline'}>
                  <a href={plan.ctaHref}>{plan.cta}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
