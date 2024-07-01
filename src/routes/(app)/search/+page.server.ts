//import { GOOGLE_BOOKS_API_KEY } from '$env/static/private';
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
		id: string;
		title: string;
		authors: string[];
		publisher: string;
		publishedDate: string;
		description: string;
		isbn10: string;
		isbn13: string;
		pageCount: number;
		categories: string[];
		language: string;
		cover: string;
	}
	const books: Book[] = [];
	if (searchString != '') {
		// search the books
		await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&maxResults=40`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const items = data.items;

				// loop through the items
				items.forEach((item: object) => {
					const book: Book = {
						id: '',
						title: '',
						authors: [],
						publisher: '',
						publishedDate: '',
						description: '',
						isbn10: '',
						isbn13: '',
						pageCount: 0,
						categories: [],
						language: '',
						cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png'
					};

					// check if properties are available
					if ('id' in item) {
						book.id = (item.id as string).toString();
					}

					if ('volumeInfo' in item) {
						const volumeInfo = item.volumeInfo as object;

						if ('title' in volumeInfo) {
							book.title = (volumeInfo.title as string).toString();
						}

						if ('authors' in volumeInfo) {
							book.authors = (volumeInfo.authors as string[]).map((author) => author.toString());
						}

						if ('publisher' in volumeInfo) {
							book.publisher = (volumeInfo.publisher as string).toString();
						}

						if ('publishedDate' in volumeInfo) {
							book.publishedDate = (volumeInfo.publishedDate as string).toString();
						}

						if ('description' in volumeInfo) {
							book.description = (volumeInfo.description as string).toString();
						}

						// check if industryIdentifiers is available
						if ('industryIdentifiers' in volumeInfo) {
							const industryIdentifiers = volumeInfo.industryIdentifiers as object[];

							industryIdentifiers.forEach((industryIdentifier) => {
								if ('type' in industryIdentifier && 'identifier' in industryIdentifier) {
									if (industryIdentifier.type == 'ISBN_10') {
										book.isbn10 = industryIdentifier.identifier as string;
									} else if (industryIdentifier.type == 'ISBN_13') {
										book.isbn13 = industryIdentifier.identifier as string;
									}
								}
							});
						}

						if ('pageCount' in volumeInfo) {
							book.pageCount = volumeInfo.pageCount as number;
						}

						if ('categories' in volumeInfo) {
							book.categories = (volumeInfo.categories as string[]).map((category) =>
								category.toString()
							);
						}

						if ('language' in volumeInfo) {
							book.language = (volumeInfo.language as string).toString();
						}

						if ('imageLinks' in volumeInfo) {
							const imageLinks = volumeInfo.imageLinks as object;

							if ('thumbnail' in imageLinks) {
								book.cover = (imageLinks.thumbnail as string).toString();
							} else if ('smallThumbnail' in imageLinks) {
								book.cover = (imageLinks.smallThumbnail as string).toString();
							}
						}
					}

					books.push(book);
				});
			});
	}

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
