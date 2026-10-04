import React from 'react';
import { getInitials, getAvatarColor } from '../../lib/format';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className = '' }) => {
  const initials = getInitials(name);
  const color = getAvatarColor(name);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px] font-semibold',
    sm: 'w-8 h-8 text-xs font-semibold',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-16 h-16 text-xl font-bold',
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full shrink-0 border select-none transition-transform ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: color.bg,
        color: color.text,
        borderColor: color.border,
      }}
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
};
