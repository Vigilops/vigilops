// @polsia:user-owned — starter home served at /. Replace it in place, or delete
// this route group before adding another page that resolves to /.

import type { Metadata } from 'next';
import { CtaSection } from '@/components/custom/landing/cta-section';
import { FeaturesSection } from '@/components/custom/landing/features-section';
import { HeroSection } from '@/components/custom/landing/hero-section';
import { HowItWorksSection } from '@/components/custom/landing/how-it-works-section';
import { PricingSection } from '@/components/custom/landing/pricing-section';
import { siteDescription, siteName } from '@/lib/site';

// Keep this a Server Component so it can export metadata.
export const metadata: Metadata = {
  title: { absolute: siteName },
  description: siteDescription,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
