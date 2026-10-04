/**
 * Formatting utilities for dates, numbers, and civic statuses
 */

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-US').format(val);
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatTimeAgo(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date('2026-10-01T01:26:52Z');
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    return formatDate(dateStr);
  } catch {
    return dateStr;
  }
}

export function getInitials(name: string): string {
  if (!name) return 'CP';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Deterministic color picker for avatars based on name hash
 */
export function getAvatarColor(name: string): { bg: string; text: string; border: string } {
  const palette = [
    { bg: '#E8F2EC', text: '#174F32', border: '#1F6B43' }, // civic green
    { bg: '#E6EFF9', text: '#14467E', border: '#1F5FA8' }, // info blue
    { bg: '#FAF0E1', text: '#8B5B16', border: '#B7791F' }, // amber warn
    { bg: '#EFEFEF', text: '#0F1B2D', border: '#4B5A6B' }, // neutral ink
    { bg: '#FCEBEA', text: '#8A1D17', border: '#B3261E' }, // danger tint
    { bg: '#EFEBF7', text: '#4C2882', border: '#6B3FA0' }, // purple tint
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % palette.length;
  return palette[index];
}
