import type { BotCustom } from './Bot';
import type { ChatMessage } from './ChatMessage';

export interface CustomChatCompletionRequest {
  bot: BotCustom;
  messages: ChatMessage[];
}