import { json } from '@sveltejs/kit';
import { OPENAI_SECRET_KEY } from '$env/static/private';
import OpenAI from 'openai';

export async function GET() {
	const openai = new OpenAI({
		apiKey: OPENAI_SECRET_KEY
	});

	const response = await openai.models.list();
	const models = response.data
		.filter((e) => e.owned_by === 'openai' || e.owned_by.startsWith('user-'))
		.sort((a, b) => a.created - b.created)
		.map((e) => e.id);

	return json(models);
}
