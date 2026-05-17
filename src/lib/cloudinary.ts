// Cloudinary URL loader for Next.js Image component
// To be used if next.config.ts is updated with:
// images: { loader: 'custom', loaderFile: './src/lib/cloudinary.ts' }

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  
  // If it's already an absolute URL (like our unsplash placeholders or generic placeholders), just return it
  if (src.startsWith('http')) return src;
  
  // Replace with actual Cloudinary cloud name when ready
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
  
  // Normalize path
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${normalizedSrc}`
}
