export * from './types';
export * from './prompts';
export * from './demo-provider';
export * from './gemini-client';
export * from './gemini-provider';

import { geminiCivicAi } from './gemini-provider';
import { CivicAIProvider } from './types';
import { isGeminiConfigured } from './gemini-client';

export const civicAi: CivicAIProvider = geminiCivicAi;
export const isGeminiLive = (): boolean => isGeminiConfigured();

