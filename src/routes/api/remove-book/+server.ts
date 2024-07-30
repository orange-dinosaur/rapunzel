import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }): Promise<Response> => {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { bookId } = await request.json();

	for (let i = 0; i < 2000; i++) {
		// do nothing
	}

	console.log('----------------------------------------------');
	console.log(bookId);
	console.log('----------------------------------------------');

	return new Response('Book Succcessfully Removed');
};
