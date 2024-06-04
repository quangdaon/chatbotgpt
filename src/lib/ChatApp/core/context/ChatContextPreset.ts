import { base } from '$app/paths';
import type { BotPreset } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { ChatContext } from './ChatContext';
import { get } from 'svelte/store';

export class ChatContextPreset extends ChatContext<BotPreset> {
	constructor(bot: BotPreset, user: string, messagesKey: string, messages: ChatMessage[]) {
		super(bot, user, messagesKey, messages);
	}

	async addMessage(userMessage: ChatMessage) {
		this.messages.update((m) => [...m, userMessage]);

		const messages = get(this.messages);
		if (this.abortController) {
			this.abortController.abort();
		}

		this.abortController = new AbortController();
		const response = await fetch(`${base}/api/completion/${this.bot.id}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(messages),
			signal: this.abortController.signal
		});

		const responseMessage: ChatMessage = await response.json();
		responseMessage.timestamp = new Date(responseMessage.timestamp);

		this.messages.update((m) => [...m, responseMessage]);
	}

	protected async loadPrompt() {
		const userParam = encodeURIComponent(this.user);
		const response = await fetch(`${base}/api/bots/${this.bot.id}/prompt?username=${userParam}`);
		const { prompt } = await response.json();

		this.prompt.set(prompt);
	}
}
