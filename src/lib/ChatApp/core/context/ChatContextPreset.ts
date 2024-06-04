import { base } from '$app/paths';
import type { BotPreset } from '$lib/models/Bot';
import type { ChatMessage } from '$lib/models/ChatMessage';
import { ChatContext } from './ChatContext';
import { get } from 'svelte/store';

export class ChatContextPreset extends ChatContext<BotPreset> {
	constructor(bot: BotPreset, user: string, messagesKey: string, messages: ChatMessage[]) {
		super(bot, user, messagesKey, messages);
	}

  protected async postChatCompletion(messages: ChatMessage[], signal: AbortSignal) {
    return await fetch(`${base}/api/completion/${this.bot.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messages),
      signal
    });
  }

	protected async loadPrompt() {
		const userParam = encodeURIComponent(this.user);
		const response = await fetch(`${base}/api/bots/${this.bot.id}/prompt?username=${userParam}`);
		const { prompt } = await response.json();

		this.prompt.set(prompt);
	}
}
