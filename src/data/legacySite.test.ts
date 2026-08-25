import { describe, expect, it } from 'vitest';
import { getService, serviceCategories, serviceDetails, servicePath, testimonials } from './legacySite';

describe('legacy-site migration catalog', () => {
  it('keeps every historic service page as a unique, routeable entry', () => {
    expect(serviceCategories).toHaveLength(5);
    expect(serviceDetails).toHaveLength(21);
    expect(new Set(serviceDetails.map((service) => service.legacyPath)).size).toBe(21);
    expect(new Set(serviceDetails.map((service) => `${service.category}/${service.slug}`)).size).toBe(21);
    expect(serviceDetails.every((service) => service.description && service.intro && service.sections.length > 0 && service.sections.every((section) => section.blocks.length > 0))).toBe(true);
  });

  it('maps known historical service URLs to their new detail records', () => {
    expect(getService('3cx', 'custom-3cx-api-development')?.legacyPath).toBe('/services/3cx/c3x-api.html');
    expect(getService('locker', 'locker-api-services')?.legacyPath).toBe('/services/locker/locker-api.html');
    expect(getService('specialized', 'data-synchronization-agents')?.legacyPath).toBe('/services/specialized/data-sync.html');
    expect(servicePath('fr', getService('3cx', 'custom-3cx-api-development')!)).toBe('/en/services/3cx/custom-3cx-api-development');
  });

  it('preserves multiple content blocks within a legacy service section', () => {
    const api = getService('3cx', 'custom-3cx-api-development');
    const tiers = api?.sections.find((section) => section.heading === 'Service Tiers & Add‑Ons');
    expect(tiers?.blocks).toEqual([
      { type: 'paragraph', content: 'We offer multiple tiers to match your needs:' },
      expect.objectContaining({ type: 'list', ordered: false, items: expect.arrayContaining(['Starter – Basic integration with source code and 3 revisions.']) }),
      { type: 'paragraph', content: 'Add‑ons include:' },
      expect.objectContaining({ type: 'list', ordered: false, items: expect.arrayContaining(['Click-to-call support (+1 day)', 'Fast delivery options and training packages']) }),
    ]);
  });

  it('retains every attributed legacy testimonial', () => {
    expect(testimonials).toHaveLength(16);
    expect(testimonials.every((testimonial) => testimonial.rating === 5 && testimonial.client && testimonial.feedback)).toBe(true);
  });
});
