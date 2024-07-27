import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }): Promise<Response> => {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { bookToSave } = await request.json();

	// set the userId of the book to be saved to the current user's id
	bookToSave.userId = locals.user.$id;

	console.log('----------------------------------------------');
	console.log(bookToSave);
	console.log('----------------------------------------------');

	return new Response('Book Succcessfully Saved');
};
