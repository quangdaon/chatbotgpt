import type { Bot } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { localStorageWritable } from '$lib/stores/localStorageWritable';
import { writable, type Writable } from 'svelte/store';

export class ChatContext {
	public messages: Writable<ChatMessage[]>;
	constructor(
		public bot: Bot,
		messagesKey: string,
		messages: ChatMessage[]
	) {
		this.messages = localStorageWritable(messagesKey, messages);
	}

	addMessage(message: ChatMessage) {
		this.messages.update((m) => [...m, message]);
	}
}
