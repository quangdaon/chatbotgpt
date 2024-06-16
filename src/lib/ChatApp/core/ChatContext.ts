import { base } from '$app/paths';
import { getPrompt } from '$lib/helpers/open-ai';
import type { Bot } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import type { ChatCompletionRequest } from '$lib/models/ChatCompletionRequest';
import { localStorageWritable } from '$lib/stores/localStorageWritable';
import { get, writable, type Writable } from 'svelte/store';
import { openAiKey } from '$lib/stores/config';
import { PUBLIC_OPENAI_SECRET_KEY_HEADER } from '$env/static/public';

export class ChatContext {
	public messages: Writable<ChatMessage[]>;
	public prompt = writable('');
	protected abortController: AbortController | null = null;

	constructor(
		public bot: Bot,
		protected user: string,
		messagesKey: string,
		messages: ChatMessage[]
	) {
		this.messages = localStorageWritable(messagesKey, messages, (key, value) => {
			if (key === 'timestamp') return new Date(value);
			return value;
		});

		this.prompt.set(getPrompt(this.bot, this.user));
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

	private async postChatCompletion(messages: ChatMessage[], signal: AbortSignal) {
		const request: ChatCompletionRequest = {
			bot: this.bot,
			messages
    };
    
		return await fetch(`${base}/api/completion`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				[PUBLIC_OPENAI_SECRET_KEY_HEADER]: get(openAiKey)
			},
			body: JSON.stringify(request),
			signal
		});
	}
}
