interface Book {
	id: string;

	toPlainObject(): object;
}

export class BookFull implements Book {
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

	constructor(objSearch?: object, objSaved?: object) {
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

		if (objSearch != undefined) {
			// check if properties are available in the object passed
			if ('id' in objSearch) {
				this.id = (objSearch.id as string).toString();
			}

			if ('volumeInfo' in objSearch) {
				const volumeInfo = objSearch.volumeInfo as object;

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

		if (objSaved != undefined) {
			if ('id' in objSaved) {
				this.id = (objSaved.id as string).toString();
			}

			if ('readingStatus' in objSaved) {
				this.readingStatus = (objSaved.readingStatus as string).toString();
			}

			if ('bookType' in objSaved) {
				this.bookType = (objSaved.bookType as string).toString();
			}

			if ('tags' in objSaved) {
				this.tags = (objSaved.tags as string[]).map((tag) => tag.toString());
			}

			if ('rating' in objSaved) {
				this.rating = objSaved.rating as number;
			}

			if ('notes' in objSaved) {
				this.notes = (objSaved.notes as string).toString();
			}

			if ('libraryId' in objSaved) {
				this.libraryId = (objSaved.libraryId as string).toString();
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

export class BookSearch implements Book {
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

export class BookSaved implements Book {
	id: string;
	readingStatus: string;
	bookType: string;
	tags: string[];
	rating: number;
	notes: string;
	libraryId: string;

	constructor(obj?: object) {
		this.id = '';
		this.readingStatus = '';
		this.bookType = '';
		this.tags = [];
		this.rating = 0;
		this.notes = '';
		this.libraryId = '';

		if (obj != undefined) {
			if ('id' in obj) {
				this.id = (obj.id as string).toString();
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
			readingStatus: this.readingStatus,
			bookType: this.bookType,
			tags: this.tags,
			rating: this.rating,
			notes: this.notes,
			libraryId: this.libraryId
		};
	}
}
