import type { Bot } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { writable } from 'svelte/store';

export class ChatContext {
	public messages = writable<ChatMessage[]>([]);
	constructor(public bot: Bot) {}

	addMessage(message: ChatMessage) {
		this.messages.update((m) => [...m, message]);
	}
}
