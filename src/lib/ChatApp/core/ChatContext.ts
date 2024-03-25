import { base } from '$app/paths';
import type { Bot } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { localStorageWritable } from '$lib/stores/localStorageWritable';
import { writable, type Writable } from 'svelte/store';

export class ChatContext {
	public messages: Writable<ChatMessage[]>;
	private abortController: AbortController | null = null;

	constructor(
		public bot: Bot,
		messagesKey: string,
		messages: ChatMessage[]
	) {
		this.messages = localStorageWritable(messagesKey, messages);
	}

	addMessage(message: ChatMessage) {
		const unsubscribe = this.messages.subscribe(async (messages) => {
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

      const message: ChatMessage = await response.json();
      message.timestamp = new Date(message.timestamp);

			this.messages.update((m) => [...m, message]);
		});

		this.messages.update((m) => [...m, message]);

		unsubscribe();
	}
}
