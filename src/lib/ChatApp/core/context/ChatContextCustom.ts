import { base } from '$app/paths';
import { getPrompt } from '$lib/helpers/open-ai';
import type { BotCustom } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import type { CustomChatCompletionRequest } from '$lib/models/CustomChatCompletionRequest';
import { userName } from '$lib/stores/config';
import { ChatContext } from './ChatContext';

export class ChatContextCustom extends ChatContext<BotCustom> {
	constructor(bot: BotCustom, user: string, messagesKey: string, messages: ChatMessage[]) {
		super(bot, user, messagesKey, messages);
	}

	protected async postChatCompletion(messages: ChatMessage[], signal: AbortSignal) {
		const request: CustomChatCompletionRequest = {
			bot: this.bot,
			messages
    };
    
		return await fetch(`${base}/api/completion/custom`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request),
			signal
		});
	}

	protected async loadPrompt() {
		this.prompt.set(getPrompt(this.bot, this.user));
	}
}
