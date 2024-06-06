import type { Bot } from './Bot';
import type { ChatMessage } from './ChatMessage';

export interface ChatCompletionRequest {
  bot: Bot;
  messages: ChatMessage[];
}
