import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kmsounds.com';

  // 1. Static Pages (Calculators 2කම ඇතුළුව)
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/venue-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // 2. Dynamic Products Pages (Supabase DB)
  const { data: products } = await supabase
    .from('products')
    .select('id, created_at, category, subCategory, sub_category');

  const productPages: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Dynamic Main Categories (DB එකේ Products වලින් Unique Categories වෙන් කිරීම)
  const rawCategories = (products || []).map((p) => p.category).filter(Boolean);
  const uniqueCategories = Array.from(new Set(rawCategories));

  const mainCategoryPages: MetadataRoute.Sitemap = uniqueCategories.map((cat) => ({
    url: `${baseUrl}/category/${encodeURIComponent(cat as string)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. Dynamic Subcategories (DB එකේ subCategory / sub_category දෙකෙන්ම Unique values ගැනීම)
  const rawSubcategories = (products || [])
    .map((p) => p.subCategory || p.sub_category)
    .filter(Boolean);
  const uniqueSubcategories = Array.from(new Set(rawSubcategories));

  const subcategoryPages: MetadataRoute.Sitemap = uniqueSubcategories.map((sub) => ({
    url: `${baseUrl}/category/${encodeURIComponent(sub as string)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...mainCategoryPages, ...subcategoryPages];
}