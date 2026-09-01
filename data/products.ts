import { supabase } from '@/lib/supabase';

// 1. Get all products directly from Supabase Database
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

// 2. Get single product by ID directly from Supabase Database
export async function getProductById(id: string | number) {
  if (!id) return null;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  // PGRST116 (0 rows) error එකක් ආවොත් console error නොදී null return කරයි
  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching product by ID:', error);
    }
    return null;
  }

  return data;
}

// 3. Get products filtered by Category (Category Grid Click සඳහා)
export async function getProductsByCategory(category: string) {
  if (!category || category.toLowerCase() === 'all') {
    return getProducts();
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', category)
    .order('id', { ascending: false });

  if (error) {
    console.error(`Error fetching products for category "${category}":`, error);
    return [];
  }

  return data || [];
}

// 4. Search products by Name, Category, or Description (Search Bar එක සඳහා)
export async function searchProducts(query: string) {
  if (!query || query.trim() === '') return getProducts();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order('id', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return data || [];
}