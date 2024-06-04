import { base } from '$app/paths';
import { getPrompt } from '$lib/helpers/open-ai';
import type { BotCustom } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { userName } from '$lib/stores/config';
import { ChatContext } from './ChatContext';

export class ChatContextCustom extends ChatContext<BotCustom> {
	constructor(bot: BotCustom, user: string, messagesKey: string, messages: ChatMessage[]) {
		super(bot, user, messagesKey, messages);
	}

	async addMessage(userMessage: ChatMessage) {
		throw new Error('Not Implemented');
	}

	protected async loadPrompt() {
		this.prompt.set(getPrompt(this.bot, this.user));
	}
}
