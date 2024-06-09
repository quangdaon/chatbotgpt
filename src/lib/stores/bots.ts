import type { Bot } from '$lib/models/Bot';
import { localStorageWritable } from './localStorageWritable';

export const customBots = localStorageWritable<Bot[]>('CUSTOM_BOTS', []);
