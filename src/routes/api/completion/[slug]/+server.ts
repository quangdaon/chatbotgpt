import type { ChatMessage } from '$lib/models/ChatMessage';
import { error, json } from '@sveltejs/kit';
import bots from '$data/bots.json';

export async function POST({params, request}) {
  if (!(params.slug in bots)) {
    return error(404);
  }

  const messages: ChatMessage[] = await request.json();

  console.log(messages);
  const bot = bots[params.slug as keyof typeof bots];

  const message: ChatMessage = {
    author: bot.displayName,
    timestamp: new Date(),
    content: 'This is a test.',
    type: 'other'
  };

  return json(message);
}