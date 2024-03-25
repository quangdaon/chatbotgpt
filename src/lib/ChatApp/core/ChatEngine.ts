import type { Bot } from '$lib/models/Bot';
import { writable } from 'svelte/store';
import { ChatContext } from './ChatContext';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { sha256 } from '$lib/helpers/crypto';
import { base } from '$app/paths';

export type ChatState = 'loading' | 'ready';

export class ChatEngine {
	state = writable<ChatState>('loading');
	bots = writable<Bot[]>([]);
	user: string = '';
	activeContext = writable<ChatContext | null>(null);

	private contexts: Record<string, ChatContext> = {};

	async init() {
		const botsCall = await fetch(`${base}/api/bots`);
		this.bots.set(await botsCall.json());
		this.state.set('ready');
	}

  async selectBot(bot: Bot) {
    this.state.set('loading');

		const key = await sha256(`${bot.id}_${this.user}`);

		if (!this.contexts[key]) {
			this.contexts[key] = this.createChatContext(bot, key);
		}

		this.activeContext.set(this.contexts[key]);
		this.state.set('ready');
	}

	private createChatContext(bot: Bot, key: string): ChatContext {
		const messagesKey = `chatMessages_${key}`;
		const savedMessages = localStorage.getItem(messagesKey);

		const messages: ChatMessage[] = savedMessages ? JSON.parse(savedMessages) : [];
		return new ChatContext(bot, messagesKey, messages);
	}
}
