import { GoogleGenAI } from '@google/genai';

/**
 * Retrieves the Gemini API key from environment variables.
 * Checks both import.meta.env.VITE_GEMINI_API_KEY and process.env.GEMINI_API_KEY.
 */
export function getGeminiApiKey(): string {
  let key = '';

  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      if (import.meta.env.VITE_GEMINI_API_KEY) {
        key = import.meta.env.VITE_GEMINI_API_KEY;
      }
    }
  } catch (_e) {
    // Ignore environment access errors
  }

  if (!key) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
      }
    } catch (_e) {
      // Ignore
    }
  }

  return (key || '').trim();
}

export function isGeminiConfigured(): boolean {
  const key = getGeminiApiKey();
  return Boolean(key && key.length > 5);
}

let aiInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

/**
 * Preferred model list in order of priority.
 * gemini-3.1-flash-lite is lightning fast and reliable for structured JSON.
 * gemini-3.8-flash and gemini-2.5-flash provide robust alternatives.
 */
export const GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-2.5-flash',
];

/**
 * Executes a Gemini request with automatic fallback between available models.
 */
export async function executeGeminiWithModelFallback<T>(
  fn: (ai: GoogleGenAI, modelName: string) => Promise<T>
): Promise<T> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('Gemini API key is not configured.');
  }

  let lastError: any = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      return await fn(ai, modelName);
    } catch (err: any) {
      console.warn(`Gemini call failed with model ${modelName}:`, err?.message || err);
      lastError = err;
      // If error is 404 (model deprecated/not found) or 503 (temporary high demand), continue to next model
      const status = err?.status || err?.code;
      if (status === 404 || status === 503 || String(err).includes('503') || String(err).includes('404')) {
        continue;
      }
      // For other errors, still try next model if available
      continue;
    }
  }

  throw lastError || new Error('All Gemini model fallbacks exhausted.');
}

/**
 * Converts a URL (Blob, Unsplash, or data URL) to a Base64 payload for Gemini multimodal input.
 */
export async function urlToBase64(url: string): Promise<{ data: string; mimeType: string } | null> {
  if (!url) return null;

  try {
    // If it's already a data URL
    if (url.startsWith('data:')) {
      const match = url.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        return { mimeType: match[1], data: match[2] };
      }
    }

    // Attempt to fetch and convert to base64
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) {
      console.warn('Image fetch failed with status:', res.status);
      return null;
    }
    const blob = await res.blob();
    const mimeType = blob.type || 'image/jpeg';
    const buffer = await blob.arrayBuffer();

    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const data = btoa(binary);
    return { data, mimeType };
  } catch (err) {
    console.warn('Failed to convert image to base64 for Gemini multimodal analysis:', err);
    return null;
  }
}
