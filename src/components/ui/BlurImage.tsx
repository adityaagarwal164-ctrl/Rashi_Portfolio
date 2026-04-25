import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function BlurImage({ src, alt, className = '', width, height, loading = 'lazy', fetchPriority }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {!loaded && (
        <div
          className="absolute inset-0 bg-charcoal animate-pulse"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
}
