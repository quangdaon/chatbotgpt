import { json } from '@sveltejs/kit';
import bots from '$data/bots.json';
import type { Bot } from '$lib/models/Bot';

export function GET() {
  const response: Bot[] = Object.entries(bots).map(([id, bot]) => ({
    id,
		name: bot.displayName,
		profilePicture: `/echoverse/profile/${id}.jpg`
  }));
  
	return json(response);
}
