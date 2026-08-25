import importedCatalog from './legacy-site.json';

export type ServiceCategoryId = '3cx' | 'locker' | 'enterprise' | 'modernization' | 'specialized';

export type ServiceContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'list'; ordered: boolean; items: string[] };

export type ServiceSection = {
  heading: string;
  blocks: ServiceContentBlock[];
};

export type ServiceDetail = {
  category: ServiceCategoryId;
  legacyPath: string;
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: ServiceSection[];
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  title: string;
  summary: string;
};

export type Testimonial = {
  client: string;
  project: string;
  date: string;
  rating: number;
  location: string;
  feedback: string;
};

type LegacyCatalog = {
  categories: ServiceCategory[];
  services: ServiceDetail[];
  testimonials: Testimonial[];
};

const catalog = importedCatalog as LegacyCatalog;

export const serviceCategories = catalog.categories;
export const serviceDetails = catalog.services;
export const testimonials = catalog.testimonials;

export function servicePath(_locale: string, service: Pick<ServiceDetail, 'category' | 'slug'>) {
  return `/en/services/${service.category}/${service.slug}`;
}

export function getService(category: string | undefined, slug: string | undefined) {
  return serviceDetails.find((service) => service.category === category && service.slug === slug);
}

export function getServicesForCategory(category: string) {
  return serviceDetails.filter((service) => service.category === category);
}

export function getCategory(category: string | undefined) {
  return serviceCategories.find((item) => item.id === category);
}
