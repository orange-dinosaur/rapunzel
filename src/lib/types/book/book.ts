export class UserBooks {
	userId: string;
	books: BookFull[];

	constructor(userId: string, obj?: { books: BookFull[] }) {
		this.userId = userId;
		this.books = [];

		if (obj != undefined) {
			if ('books' in obj) {
				this.books = (obj.books as BookFull[]).map((book) => new BookFull(book));
			}
		}
	}

	toPlainObject() {
		return {
			userId: this.userId,
			books: this.books.map((book) => book.toPlainObject())
		};
	}
}

export class BookFull {
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
	readingStatus: string;
	bookType: string;
	tags: string[];
	rating: number;
	notes: string;
	libraryId: string;

	constructor(obj?: object) {
		this.id = '';
		this.title = '';
		this.authors = [];
		this.publisher = '';
		this.publishedDate = '';
		this.description = '';
		this.isbn10 = '';
		this.isbn13 = '';
		this.pageCount = 0;
		this.categories = [];
		this.language = '';
		this.cover = 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png';
		this.readingStatus = '';
		this.bookType = '';
		this.tags = [];
		this.rating = 0;
		this.notes = '';
		this.libraryId = '';

		if (obj != undefined) {
			// check if properties are available in the object passed
			if ('id' in obj) {
				this.id = (obj.id as string).toString();
			}

			if ('title' in obj) {
				this.title = (obj.title as string).toString();
			}

			if ('authors' in obj) {
				this.authors = (obj.authors as string[]).map((author) => author.toString());
			}

			if ('publisher' in obj) {
				this.publisher = (obj.publisher as string).toString();
			}

			if ('publishedDate' in obj) {
				this.publishedDate = (obj.publishedDate as string).toString();
			}

			if ('description' in obj) {
				this.description = (obj.description as string).toString();
			}

			// check if industryIdentifiers is available
			if ('industryIdentifiers' in obj) {
				const industryIdentifiers = obj.industryIdentifiers as object[];

				industryIdentifiers.forEach((industryIdentifier) => {
					if ('type' in industryIdentifier && 'identifier' in industryIdentifier) {
						if (industryIdentifier.type == 'ISBN_10') {
							this.isbn10 = industryIdentifier.identifier as string;
						} else if (industryIdentifier.type == 'ISBN_13') {
							this.isbn13 = industryIdentifier.identifier as string;
						}
					}
				});
			}

			if ('pageCount' in obj) {
				this.pageCount = obj.pageCount as number;
			}

			if ('categories' in obj) {
				this.categories = (obj.categories as string[]).map((category) => category.toString());
			}

			if ('language' in obj) {
				this.language = (obj.language as string).toString();
			}

			if ('imageLinks' in obj) {
				const imageLinks = obj.imageLinks as object;

				if ('thumbnail' in imageLinks) {
					this.cover = (imageLinks.thumbnail as string).toString();
				} else if ('smallThumbnail' in imageLinks) {
					this.cover = (imageLinks.smallThumbnail as string).toString();
				}
			}

			if ('readingStatus' in obj) {
				this.readingStatus = (obj.readingStatus as string).toString();
			}

			if ('bookType' in obj) {
				this.bookType = (obj.bookType as string).toString();
			}

			if ('tags' in obj) {
				this.tags = (obj.tags as string[]).map((tag) => tag.toString());
			}

			if ('rating' in obj) {
				this.rating = obj.rating as number;
			}

			if ('notes' in obj) {
				this.notes = (obj.notes as string).toString();
			}

			if ('libraryId' in obj) {
				this.libraryId = (obj.libraryId as string).toString();
			}
		}
	}

	toPlainObject() {
		return {
			id: this.id,
			title: this.title,
			authors: this.authors,
			publisher: this.publisher,
			publishedDate: this.publishedDate,
			description: this.description,
			isbn10: this.isbn10,
			isbn13: this.isbn13,
			pageCount: this.pageCount,
			categories: this.categories,
			language: this.language,
			cover: this.cover,
			readingStatus: this.readingStatus,
			bookType: this.bookType,
			tags: this.tags,
			rating: this.rating,
			notes: this.notes,
			libraryId: this.libraryId
		};
	}
}

export class BookSearch {
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

	constructor(obj?: {
		id?: string;
		volumeInfo?: {
			title?: string;
			authors?: string[];
			publisher?: string;
			publishedDate?: string;
			description?: string;
			industryIdentifiers?: object[];
			pageCount?: number;
			categories?: string[];
			language?: string;
			imageLinks?: object;
		};
	}) {
		this.id = '';
		this.title = '';
		this.authors = [];
		this.publisher = '';
		this.publishedDate = '';
		this.description = '';
		this.isbn10 = '';
		this.isbn13 = '';
		this.pageCount = 0;
		this.categories = [];
		this.language = '';
		this.cover = 'https://i.pinimg.com/originals/a0/69/7a/a0697af2de64d67cf6dbb2a13dbc0457.png';

		if (obj != undefined) {
			// check if properties are available in the object passed
			if ('id' in obj) {
				this.id = (obj.id as string).toString();
			}

			if ('volumeInfo' in obj) {
				const volumeInfo = obj.volumeInfo as object;

				if ('title' in volumeInfo) {
					this.title = (volumeInfo.title as string).toString();
				}

				if ('authors' in volumeInfo) {
					this.authors = (volumeInfo.authors as string[]).map((author) => author.toString());
				}

				if ('publisher' in volumeInfo) {
					this.publisher = (volumeInfo.publisher as string).toString();
				}

				if ('publishedDate' in volumeInfo) {
					this.publishedDate = (volumeInfo.publishedDate as string).toString();
				}

				if ('description' in volumeInfo) {
					this.description = (volumeInfo.description as string).toString();
				}

				// check if industryIdentifiers is available
				if ('industryIdentifiers' in volumeInfo) {
					const industryIdentifiers = volumeInfo.industryIdentifiers as object[];

					industryIdentifiers.forEach((industryIdentifier) => {
						if ('type' in industryIdentifier && 'identifier' in industryIdentifier) {
							if (industryIdentifier.type == 'ISBN_10') {
								this.isbn10 = industryIdentifier.identifier as string;
							} else if (industryIdentifier.type == 'ISBN_13') {
								this.isbn13 = industryIdentifier.identifier as string;
							}
						}
					});
				}

				if ('pageCount' in volumeInfo) {
					this.pageCount = volumeInfo.pageCount as number;
				}

				if ('categories' in volumeInfo) {
					this.categories = (volumeInfo.categories as string[]).map((category) =>
						category.toString()
					);
				}

				if ('language' in volumeInfo) {
					this.language = (volumeInfo.language as string).toString();
				}

				if ('imageLinks' in volumeInfo) {
					const imageLinks = volumeInfo.imageLinks as object;

					if ('thumbnail' in imageLinks) {
						this.cover = (imageLinks.thumbnail as string).toString();
					} else if ('smallThumbnail' in imageLinks) {
						this.cover = (imageLinks.smallThumbnail as string).toString();
					}
				}
			}
		}
	}

	toPlainObject() {
		return {
			id: this.id,
			title: this.title,
			authors: this.authors,
			publisher: this.publisher,
			publishedDate: this.publishedDate,
			description: this.description,
			isbn10: this.isbn10,
			isbn13: this.isbn13,
			pageCount: this.pageCount,
			categories: this.categories,
			language: this.language,
			cover: this.cover
		};
	}
}

export class BookToSave {
	bookId: string;
	userId: string;
	readingStatus: string;
	bookType: string;
	tags: string[];
	rating: number;
	notes: string;
	libraryId: string;

	constructor(obj?: {
		bookId: string;
		userId?: string;
		readingStatus?: string;
		bookType?: string;
		tags?: string[];
		rating?: number;
		notes?: string;
		libraryId?: string;
	}) {
		this.bookId = '';
		this.userId = '';
		this.readingStatus = '';
		this.bookType = '';
		this.tags = [];
		this.rating = 0;
		this.notes = '';
		this.libraryId = '';

		if (obj != undefined) {
			if ('bookId' in obj) {
				this.bookId = (obj.bookId as string).toString();
			}

			if ('userId' in obj) {
				this.userId = (obj.userId as string).toString();
			}

			if ('readingStatus' in obj) {
				this.readingStatus = (obj.readingStatus as string).toString();
			}

			if ('bookType' in obj) {
				this.bookType = (obj.bookType as string).toString();
			}

			if ('tags' in obj) {
				this.tags = (obj.tags as string[]).map((tag) => tag.toString());
			}

			if ('rating' in obj) {
				this.rating = obj.rating as number;
			}

			if ('notes' in obj) {
				this.notes = (obj.notes as string).toString();
			}

			if ('libraryId' in obj) {
				this.libraryId = (obj.libraryId as string).toString();
			}
		}
	}

	toPlainObject() {
		return {
			id: this.bookId,
			readingStatus: this.readingStatus,
			bookType: this.bookType,
			tags: this.tags,
			rating: this.rating,
			notes: this.notes,
			libraryId: this.libraryId
		};
	}
}
