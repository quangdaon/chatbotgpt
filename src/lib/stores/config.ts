import { localStorageWritable } from './localStorageWritable';

export type AppMode = 'immersive' | 'dev';
export const userName = localStorageWritable('USER_DISPLAY_NAME', '');
export const appMode = localStorageWritable<AppMode>('APP_MODE', 'immersive');
export const openAiKey = localStorageWritable('OPEN_AI_SECRET', '')