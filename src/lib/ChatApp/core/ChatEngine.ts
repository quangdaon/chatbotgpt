import type { Bot } from '$lib/models/Bot';
import { get, writable } from 'svelte/store';
import { ChatContext } from './ChatContext';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { sha256 } from '$lib/helpers/crypto';
import { base } from '$app/paths';
import { appState } from '$lib/stores/appState';
import { localStorageWritable } from '$lib/stores/localStorageWritable';

export class ChatEngine {
	bots = localStorageWritable<Bot[]>('ALL_BOTS', []);
	user: string = '';
	activeContext = writable<ChatContext | null>(null);

	private contexts: Record<string, ChatContext> = {};

	async init() {
		await this.loadBots();
		appState.set('chatting');
	}

	async loadBots() {
		if (get(this.bots).length > 0) return;

		await this.loadDefaultBots();
	}

	async resetBots() {
		if (!confirm('Are you sure?')) return;
		await this.loadDefaultBots();
		alert('Done.');
	}

	async loadDefaultBots() {
		const botsCall = await fetch(`${base}/api/bots`);
		const botsPreset: Bot[] = await botsCall.json();

		this.bots.set(botsPreset);
	}

	async addBot(bot: Bot) {
		this.bots.update((bots) => {
			return bots.find((e) => e.id === bot.id)
				? bots.map((e) => (e.id === bot.id ? bot : e))
				: [...bots, bot];
		});

		const key = await this.getContextKey(bot);
		this.contexts[key] = this.createChatContext(bot, key);
		this.activeContext.set(this.contexts[key]);
	}

	deleteBot(bot: Bot): void {
		this.bots.update((bots) => bots.filter((e) => e.id !== bot.id));

		if (bot.id === get(this.activeContext)?.bot.id) {
			this.activeContext.set(null);
		}
	}

	async selectBot(bot: Bot) {
		const loadingTimeout = setTimeout(() => appState.set('loading'), 50);

		const key = await this.getContextKey(bot);

		if (!this.contexts[key]) {
			this.contexts[key] = this.createChatContext(bot, key);
		}

		this.activeContext.set(this.contexts[key]);

		clearTimeout(loadingTimeout);
		appState.set('chatting');
	}

	private async getContextKey(bot: Bot) {
		return await sha256(`${bot.id}_${this.user}`);
	}

	private createChatContext(bot: Bot, key: string): ChatContext {
		const messagesKey = `chatMessages_${key}`;
		const savedMessages = localStorage.getItem(messagesKey);

		const messages: ChatMessage[] = savedMessages ? JSON.parse(savedMessages) : [];
		return new ChatContext(bot, this.user, messagesKey, messages);
	}
}
