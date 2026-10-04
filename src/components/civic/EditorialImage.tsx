import React, { useState } from 'react';
import { TOPOGRAPHIC_SVG_FALLBACK } from '../../data/images';
import { Camera } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  credit?: string;
  location?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9' | '3/2';
  priority?: boolean;
  className?: string;
  overlayText?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  credit,
  location,
  aspectRatio = '16/9',
  priority = false,
  className = '',
  overlayText,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
    '3/2': 'aspect-[3/2]',
  }[aspectRatio];

  return (
    <figure className={`relative overflow-hidden rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] ${aspectClass} ${className}`}>
      <img
        src={hasError ? TOPOGRAPHIC_SVG_FALLBACK : src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded || hasError ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {overlayText && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1B2D]/80 via-[#0F1B2D]/40 to-transparent p-3 text-white">
          <p className="text-xs font-medium leading-snug">{overlayText}</p>
        </div>
      )}

      {(credit || location) && (
        <figcaption className="sr-only">
          {alt} {location ? `in ${location}.` : ''} {credit ? `Photo credit: ${credit}.` : ''}
        </figcaption>
      )}
    </figure>
  );
};
