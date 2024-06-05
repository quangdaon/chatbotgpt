import { writable } from 'svelte/store';

export type AppState = 'loading' | 'chatting' | 'custom';

export const appState = writable<AppState>('loading');
