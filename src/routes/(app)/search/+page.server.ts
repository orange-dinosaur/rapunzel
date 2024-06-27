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
	interface Book {
		title: string;
		author: string;
		description: string;
		cover: string;
	}
	let books: Book[] = [];
	if (searchString != '') {
		// search the books
		books = [
			{
				title: 'Book Title 1',
				author: 'Author Name 1',
				description: 'Book Description 1',
				cover:
					'https://www.rebeccayarros.com/wp-content/uploads/2022/10/FourthWing-final-1600-1365x2048.jpg'
			},
			{
				title: 'Book Title 2',
				author: 'Author Name 2',
				description: 'Book Description 2',
				cover:
					'https://images.lovelybooks.de/img/520x/cover.allsize.lovelybooks.de/9783455650877_1583288353000_xxl.jpg'
			},
			{
				title: 'Book Title 3',
				author: 'Author Name 3',
				description: 'Book Description 3',
				cover:
					'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1679005122i/123257687.jpg'
			},
			{
				title: 'Book Title 4',
				author: 'Author Name 4',
				description: 'Book Description 4',
				cover: 'https://img.ibs.it/images/9788834733790_0_0_0_75.jpg'
			}
		];
	}

	// Pass the stored user local to the page.
	return {
		user: locals.user,
		searchString,
		books
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
