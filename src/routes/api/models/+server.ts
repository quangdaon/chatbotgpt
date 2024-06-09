import { json } from '@sveltejs/kit';
import { OPENAI_SECRET_KEY } from '$env/static/private';
import OpenAI from 'openai';

export async function GET() {
	const openai = new OpenAI({
		apiKey: OPENAI_SECRET_KEY
	});

	const response = await openai.models.list();

	return json(response);
}
