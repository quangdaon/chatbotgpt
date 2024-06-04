export type ChatMessageType = 'self' | 'other';


export interface ChatMessage {
  author: string;
  type: ChatMessageType;
  content: string;
  timestamp: Date;
}