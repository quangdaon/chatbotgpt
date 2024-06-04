import type { BotCustom } from '$lib/models/Bot';
import { localStorageWritable } from './localStorageWritable';

export const customBots = localStorageWritable<BotCustom[]>('CUSTOM_BOTS', []);
