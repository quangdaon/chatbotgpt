import type { Bot } from '$lib/models/Bot';
import { writable } from 'svelte/store';
import { ChatContext } from './ChatContext';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { sha256 } from '$lib/helpers/crypto';
import { base } from '$app/paths';
import { appState } from '$lib/stores/appState';

export class ChatEngine {
	bots = writable<Bot[]>([]);
	user: string = '';
	activeContext = writable<ChatContext | null>(null);

	private contexts: Record<string, ChatContext> = {};

	async init() {
		const botsCall = await fetch(`${base}/api/bots`);
		this.bots.set(await botsCall.json());
		appState.set('chatting');
	}

	async selectBot(bot: Bot) {
		const loadingTimeout = setTimeout(() => appState.set('loading'), 50);

		const key = await sha256(`${bot.id}_${this.user}`);

		if (!this.contexts[key]) {
			this.contexts[key] = this.createChatContext(bot, key);
		}

		this.activeContext.set(this.contexts[key]);

		clearTimeout(loadingTimeout);
		appState.set('chatting');
	}

	private createChatContext(bot: Bot, key: string): ChatContext {
		const messagesKey = `chatMessages_${key}`;
		const savedMessages = localStorage.getItem(messagesKey);

		const messages: ChatMessage[] = savedMessages ? JSON.parse(savedMessages) : [];
		return new ChatContext(bot, this.user, messagesKey, messages);
	}
}
