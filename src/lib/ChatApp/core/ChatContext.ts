import { base } from '$app/paths';
import type { Bot } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { localStorageWritable } from '$lib/stores/localStorageWritable';
import { writable, type Writable, get } from 'svelte/store';

export class ChatContext {
	public messages: Writable<ChatMessage[]>;
	public prompt = writable('');
	private abortController: AbortController | null = null;

	constructor(
		public bot: Bot,
		private user: string,
		messagesKey: string,
		messages: ChatMessage[]
	) {
		this.messages = localStorageWritable(messagesKey, messages, (key, value) => {
			if (key === 'timestamp') return new Date(value);
			return value;
		});

		this.loadPrompt();
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

	clear() {
		this.messages.set([]);
	}

	private async loadPrompt() {
		const userParam = encodeURIComponent(this.user);
		const response = await fetch(`${base}/api/bots/${this.bot.id}/prompt?username=${userParam}`);
		const { prompt } = await response.json();

		this.prompt.set(prompt);
	}
}
