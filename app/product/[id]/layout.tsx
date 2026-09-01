import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    return { title: 'Professional Audio | K.M SOUNDS' };
  }

  // Fallback structure to prevent 'undefined' issues
  const productTitle = product.name || product.title || product.model || 'Product Details';
  const productPrice = product.price ? `LKR ${product.price.toLocaleString()}` : '';

  const imageUrl = Array.isArray(product.images) ? product.images[0] : (product.image_url || '');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kmsounds.com';
  
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(
    productTitle
  )}&price=${encodeURIComponent(product.price || '')}&image=${encodeURIComponent(
    imageUrl
  )}`;

  return {
    title: `${productTitle} | K.M SOUNDS`,
    description: `${productPrice} - Buy High Quality Audio Baffles and Gear from K.M SOUNDS.`,
    openGraph: {
      title: productTitle,
      description: `${productPrice} - Order via WhatsApp`,
      url: `${baseUrl}/product/${id}`,
      siteName: 'K.M SOUNDS',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: productTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: productTitle,
      description: productPrice,
      images: [ogImageUrl],
    },
  };
}

export default function ProductLayout({ children }: Props) {
  return <>{children}</>;
}