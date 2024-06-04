import type { Bot } from '$lib/models/Bot';
import { writable } from 'svelte/store';
import type { ChatContext } from './context/ChatContext';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { ChatContextPreset } from './context/ChatContextPreset';
import { sha256 } from '$lib/helpers/crypto';
import { base } from '$app/paths';
import { appState } from '$lib/stores/appState';
import { ChatContextCustom } from './context/ChatContextCustom';

export class ChatEngine {
	bots = writable<Bot[]>([]);
	user: string = '';
	activeContext = writable<ChatContext<Bot> | null>(null);

	private contexts: Record<string, ChatContext<Bot>> = {};

	async init() {
		const botsCall = await fetch(`${base}/api/bots`);
		this.bots.set(await botsCall.json());
		appState.set('chatting');
	}

	addBot(bot: Bot) {
		this.bots.update((bots) => [...bots, bot]);
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

	private createChatContext(bot: Bot, key: string): ChatContext<Bot> {
		const messagesKey = `chatMessages_${key}`;
		const savedMessages = localStorage.getItem(messagesKey);

		const messages: ChatMessage[] = savedMessages ? JSON.parse(savedMessages) : [];
		return bot.type === 'custom'
			? new ChatContextCustom(bot, this.user, messagesKey, messages)
			: new ChatContextPreset(bot, this.user, messagesKey, messages);
	}
}
