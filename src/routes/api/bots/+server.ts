import { json } from '@sveltejs/kit';
import bots from '$data/bots.json';
import type { Bot } from '$lib/models/Bot';
import { base } from '$app/paths';

export function GET({ request }) {
	const url = new URL(request.url);
	const response: Bot[] = Object.entries(bots).map(([id, bot]) => ({
		id,
		name: bot.displayName,
		profilePicture: `${base}/profile/${id}.jpg`,
		prompt: bot.prompt,
		model: bot.model ?? ''
	}));

	return json(response);
}
