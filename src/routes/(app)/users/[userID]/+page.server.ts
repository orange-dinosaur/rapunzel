import { UserBooks } from '$lib/types/book/book.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	// Logged out users can't access this page.
	if (!locals.user) {
		redirect(301, '/register');
	} else if (!locals.user.emailVerification) {
		// If the user is logged in and is email is verified, redirect to its home page.
		redirect(301, '/login');
	}

	// check if the user has books
	let userBooks: UserBooks;
	if (locals.userBooks && locals.userBooks.userId === locals.user.$id) {
		userBooks = locals.userBooks;
	} else {
		userBooks = new UserBooks(locals.user.$id);
	}

	// convert the books to plain objects so that they can be sent to the client and serialized
	const plainObjectUserBooks = userBooks.books.map((book) => book.toPlainObject());

	// Pass the stored user local to the page.
	return {
		user: locals.user,
		userBooks: plainObjectUserBooks
	};
}
