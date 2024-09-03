import {
	PUBLIC_EXTERNAL_BOOKS_API_MAX_RESULTS,
	PUBLIC_EXTERNAL_BOOKS_API_URL
} from '$env/static/public';
import { PRIVATE_EXTERNAL_BOOKS_API_KEY } from '$env/static/private';
import { BookSearch, UserBooks } from '$lib/types/book/book.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	// Logged out users can't access this page.
	if (!locals.user) {
		redirect(301, '/register');
	} else if (!locals.user.emailVerification) {
		// If the user is logged in and is email is verified, redirect to its home page.
		redirect(301, '/login');
	}

	// get the search params from the URL
	let searchString = '';
	if (url.searchParams.has('searchString')) {
		// get the searchString
		searchString = url.searchParams.get('searchString') ?? '';
	}

	// search the books
	const books: BookSearch[] = [];
	if (searchString != '') {
		// search the books
		await fetch(
			`${PUBLIC_EXTERNAL_BOOKS_API_URL}?q=${searchString}&maxResults=${PUBLIC_EXTERNAL_BOOKS_API_MAX_RESULTS}&key=${PRIVATE_EXTERNAL_BOOKS_API_KEY}`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const items = data.items;

				// loop through the items
				items.forEach((item: object) => {
					const book = new BookSearch(item);

					books.push(book);
				});
			});
	}

	// convert the books to plain objects so that they can be sent to the client and serialized
	const plainObjectBooks = books.map((book) => book.toJSON());

	// check if the user has books
	let userBooks: UserBooks;
	if (locals.userBooks && locals.userBooks.userId === locals.user.$id) {
		userBooks = locals.userBooks;
	} else {
		userBooks = new UserBooks(locals.user.$id);
	}

	// convert the books to plain objects so that they can be sent to the client and serialized
	const plainObjectUserBooks = userBooks.books.map((book) => book.toJSON());

	return {
		user: locals.user,
		searchString,
		books: plainObjectBooks,
		userBooks: plainObjectUserBooks
	};
}

// Search books
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const searchStr = formData.get('searchStr')?.toString() ?? '';

		redirect(307, `/search?searchString=${searchStr}`);
	}
};
