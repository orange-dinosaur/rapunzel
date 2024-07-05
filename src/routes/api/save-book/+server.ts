import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
	const { bookToSave } = await request.json();

	console.log('----------------------------------------------');
	console.log(bookToSave);
	console.log('----------------------------------------------');

	return new Response('Book Succcessfully Saved');
};
