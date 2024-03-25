import type { Bot } from '$lib/models/Bot';
import { writable } from 'svelte/store';
import { ChatContext } from './ChatContext';

export type ChatState = 'loading' | 'ready';

export class ChatEngine {
  state = writable<ChatState>('loading');
  bots = writable<Bot[]>([]);
  activeBot = writable<Bot | null>(null);
  activeContext = writable<ChatContext | null>(null);

  private contexts: Record<string, ChatContext> = {};

  async init() {
		const botsCall = await fetch('/echoverse/api/bots');
    this.bots.set(await botsCall.json());
    this.state.set('ready');
  }

  async selectBot(bot: Bot) {
    this.activeBot.set(bot);

    if (!this.contexts[bot.id]) {
      this.contexts[bot.id] = this.createChatContext(bot);
    }

    this.activeContext.set(this.contexts[bot.id]);
  }
  
  private createChatContext(bot: Bot): ChatContext {
    return new ChatContext(bot);
  }
}