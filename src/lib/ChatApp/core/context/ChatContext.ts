import type { Bot, BotBase } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { localStorageWritable } from '$lib/stores/localStorageWritable';
import { get, writable, type Writable } from 'svelte/store';

export abstract class ChatContext<TBot extends BotBase> {
	public messages: Writable<ChatMessage[]>;
	public prompt = writable('');
	protected abortController: AbortController | null = null;

	constructor(
		public bot: TBot,
		protected user: string,
		messagesKey: string,
		messages: ChatMessage[]
	) {
		this.messages = localStorageWritable(messagesKey, messages, (key, value) => {
			if (key === 'timestamp') return new Date(value);
			return value;
		});

		this.loadPrompt();
	}

	clear() {
		this.messages.set([]);
	}

	async addMessage(userMessage: ChatMessage) {
		this.messages.update((m) => [...m, userMessage]);

		const messages = get(this.messages);
		if (this.abortController) {
			this.abortController.abort();
		}

		this.abortController = new AbortController();
		const response = await this.postChatCompletion(messages, this.abortController.signal);

		const responseMessage: ChatMessage = await response.json();
		responseMessage.timestamp = new Date(responseMessage.timestamp);

		this.messages.update((m) => [...m, responseMessage]);
	}

	protected abstract postChatCompletion(
		messages: ChatMessage[],
		signal: AbortSignal
	): Promise<Response>;

	protected abstract loadPrompt(): void | Promise<void>;
}
