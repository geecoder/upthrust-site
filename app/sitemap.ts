import { MetadataRoute } from 'next';
import { SITE } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/accelerator`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/assessment`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pathways/product-management`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pathways/business-analysis`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pathways/product-design`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pathways/payment-operations`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/enrol`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/consultation`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // /verify and /faq are intentionally excluded — hidden from nav/footer for now.
  ];
}
