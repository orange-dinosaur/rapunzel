import { BookFull, UserBooks } from '$lib/types/book/book';

export async function getUserBooks(userID: string) {
	console.log('--------------------------------------------');
	console.log('RETURNING USER BOOKS FOR USER ID:', userID);
	console.log('--------------------------------------------');

	// This is a mock implementation of the function
	// TODO: Implement the actual function to get the user's books from the database
	const books: BookFull[] = [];

	const book1 = new BookFull({
		id: '-wJ1ACI7ooAC',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book2 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book3 = new BookFull({
		id: 'zN-lDwAAQBAJ',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book4 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book5 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book6 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book7 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book8 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book9 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book10 = new BookFull({
		id: 'NjxIwgEACAAJ',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book11 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book12 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book13 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book14 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book15 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book16 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book17 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book18 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book19 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});
	const book20 = new BookFull({
		id: 'a1b2c3d4e5f6',
		title: 'Book Title',
		authors: ['Author Name 1', 'Author Name 2'],
		publisher: 'Publisher 1',
		publishedDate: '2024-01-01',
		description: 'Description of the book',
		isbn10: '0000000000',
		isbn13: '1111111111111',
		pageCount: 123,
		categories: ['Category 1', 'Category 2'],
		language: 'it',
		cover: 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png',
		readingStatus: 'reading',
		bookType: 'book',
		tags: ['tag1', 'tag2'],
		rating: 3.5,
		notes: '',
		libraryId: '1234567890'
	});

	books.push(book1);
	books.push(book2);
	books.push(book3);
	books.push(book4);
	books.push(book5);
	books.push(book6);
	books.push(book7);
	books.push(book8);
	books.push(book9);
	books.push(book10);
	books.push(book11);
	books.push(book12);
	books.push(book13);
	books.push(book14);
	books.push(book15);
	books.push(book16);
	books.push(book17);
	books.push(book18);
	books.push(book19);
	books.push(book20);

	const userBooks = new UserBooks(userID, { books });

	return userBooks;
}
