import type { Bot, BotBase } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { localStorageWritable } from '$lib/stores/localStorageWritable';
import { writable, type Writable } from 'svelte/store';

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

	abstract addMessage(userMessage: ChatMessage): Promise<void>;

	protected abstract loadPrompt(): void | Promise<void>;
}
