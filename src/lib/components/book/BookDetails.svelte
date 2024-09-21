<script lang="ts">
	import { BookCheck, LoaderCircle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Sheet from '$lib/components/ui/sheet';
	import { BookToSave, BookFull, BookToUpdate } from '$lib/types/book/book';
	import StarRating from '$lib/components/rating/StarRating.svelte';
	import Tags from '$lib/components/tags/Tags.svelte';
	import SingleSelection from '../selection/SingleSelection.svelte';
	import { toast } from 'svelte-sonner';
	import { userData } from '$lib/state/state.svelte';

	let { book, displayMode }: { book: BookFull; displayMode: 'search' | 'home' } = $props();

	let tempBookId = $state('');

	// check if the book is already in the user's library
	let isAlreadySaved = $state($userData.userBooks.books.some((b) => b.bookId === book.bookId));

	// boolean variables that define if there is an action ongoing
	let isLoadingSave = $state(false);
	let isLoadingWishlist = $state(false);
	let isLoadingUpdate = $state(false);
	let isLoadingRemove = $state(false);
	let isLoadingWhishlist = $state(false);
	let isSheetOpen = $state(false);

	// boolean variables that define is a property of the book has been changed
	let isReadingStatusChanged = $state(false);
	let isReadingStartDateChanged = $state(false);
	let isReadingEndDateChanged = $state(false);
	let isBookTypeChanged = $state(false);
	let isTagsChanged = $state(false);
	let isRatingChanged = $state(false);
	let isBookChanged = () => {
		return (
			isReadingStatusChanged ||
			isReadingStartDateChanged ||
			isReadingEndDateChanged ||
			isBookTypeChanged ||
			isTagsChanged ||
			isRatingChanged
		);
	};

	// define possible values for selection components
	const readingStatusSelection = ['to-read', 'reading', 'completed', 'dnf'];
	const bookTypeSelection = ['book', 'e-book', 'audiobook'];

	// if the book is already in the user's library,
	// set the book properties with the user's book properties
	// otherwise, set the book properties with the default values
	function defineInitialValues() {
		return {
			readingStatus: isAlreadySaved ? book.readingStatus : '',
			bookType: isAlreadySaved ? book.bookType : '',
			tags: isAlreadySaved ? book.tags : [],
			rating: isAlreadySaved ? book.rating : 0,
			readingStartDate: new Date(),
			readingEndDate: new Date()
		};
	}
	let initialValues = defineInitialValues();
	let readingStatus = $state(initialValues.readingStatus);
	let bookType = $state(initialValues.bookType);
	let tags: string[] = $state(initialValues.tags);
	let rating: number = $state(initialValues.rating);
	let readingStartDate = $state(book.readingStartDate);
	let readingEndDate = $state(book.readingEndDate);

	// functions to manage changes on book's properties
	function handleReadingStatusChange(newReadingStatus: string) {
		readingStatus = newReadingStatus;
		if (newReadingStatus !== book.readingStatus) {
			isReadingStatusChanged = true;
		} else {
			isReadingStatusChanged = false;
		}
	}
	function handleBookTypeChange(newBookType: string) {
		bookType = newBookType;
		if (newBookType !== book.bookType) {
			isBookTypeChanged = true;
		} else {
			isBookTypeChanged = false;
		}
	}
	function handleTagsChange(newTags: string[]) {
		tags = newTags;
		if (newTags !== book.tags) {
			isTagsChanged = true;
		} else {
			isTagsChanged = false;
		}
	}
	function handleRatingChange(newRating: number) {
		rating = newRating;
		if (newRating !== book.rating) {
			isRatingChanged = true;
		} else {
			isRatingChanged = false;
		}
	}

	// save the book to the user's library
	async function saveBookToLibrary() {
		const bookToSave = new BookToSave({
			bookId: book.bookId,
			readingStatus,
			bookType,
			tags,
			rating
		}).toJSON();

		// set the userId of the book to be saved to the current user's id
		bookToSave.userId = $userData.user.$id;

		isLoadingSave = true;

		const res = await fetch('/api/save-book', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bookToSave)
		});

		if (!res.ok) {
			toast.error('Error updating book');
		} else {
			// get the book from the response
			const savedBookId = await res.json();

			// create a bookFull object
			const SavedBookFull = new BookFull({
				id: savedBookId.id,
				title: book.title,
				authors: book.authors,
				publisher: book.publisher,
				publishedDate: book.publishedDate,
				description: book.description,
				pageCount: book.pageCount,
				categories: book.categories,
				language: book.language,
				cover: book.cover,
				...bookToSave
			});

			// update user state
			// TODO: find a better way to update the user state
			$userData.userBooks.books = [...$userData.userBooks.books, SavedBookFull];

			// update the tempBookId so that it can be used to update the book before the user refreshes the page
			tempBookId = savedBookId.id;

			toast.success('Book saved successfully');

			// reset the values of the isChanged variables
			isReadingStatusChanged = false;
			isReadingStartDateChanged = false;
			isReadingEndDateChanged = false;
			isBookTypeChanged = false;
			isTagsChanged = false;
			isRatingChanged = false;
		}

		isAlreadySaved = true;
		isLoadingSave = false;
	}

	// update the book in the user's library
	async function updateBookInLibrary() {
		// create a book to update object setting only the fields that have changed
		const bookToUpdate = new BookToUpdate({
			readingStatus: isReadingStatusChanged ? readingStatus : undefined,
			readingStartDate: isReadingStartDateChanged ? readingStartDate.toDateString() : undefined,
			readingEndDate: isReadingEndDateChanged ? readingEndDate.toDateString() : undefined,
			bookType: isBookTypeChanged ? bookType : undefined,
			tags: isTagsChanged ? tags : undefined,
			rating: isRatingChanged ? rating : undefined,
			notes: undefined,
			libraryId: undefined
		});
		const bookToUpdateJSON = bookToUpdate.toJSON();

		isLoadingUpdate = true;

		let bookIdToUpdate = book.id === '' ? tempBookId : book.id;

		const res = await fetch(`/api/update-book/${$userData.user.$id}/${bookIdToUpdate}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bookToUpdateJSON)
		});

		if (!res.ok) {
			toast.error('Error updating book');
		} else {
			// update user state
			// TODO: find a better way to update the user state
			const updatedBooksJSON = $userData.userBooks.books.map((b) => {
				if (b.id === book.id) {
					return {
						...b,
						...bookToUpdateJSON
					};
				}
				return b;
			});
			const updatedBooks = updatedBooksJSON.map((b) => BookFull.fromJSON(b));
			$userData.userBooks.books = updatedBooks;

			userData.set({
				user: $userData.user,
				userBooks: $userData.userBooks
			});

			toast.success('Book updated successfully');

			// reset the values of the isChanged variables
			isReadingStatusChanged = false;
			isReadingStartDateChanged = false;
			isReadingEndDateChanged = false;
			isBookTypeChanged = false;
			isTagsChanged = false;
			isRatingChanged = false;
		}

		isLoadingUpdate = false;
	}

	async function removeBookFromLibrary() {
		isLoadingRemove = true;

		let bookIdToDelete = book.id === '' ? tempBookId : book.id;

		const res = await fetch(`/api/remove-book/${$userData.user.$id}/${bookIdToDelete}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) {
			// display error
			toast.error('Error deleting book');
		} else {
			// update user state
			// TODO: find a better way to update the user state
			const updatedBooks = $userData.userBooks.books.filter((b) => b.id !== book.id);
			$userData.userBooks.books = updatedBooks;

			userData.set({
				user: $userData.user,
				userBooks: $userData.userBooks
			});

			toast.success('Book deleted successfully');

			isSheetOpen = false;
		}

		isSheetOpen = false;
		isAlreadySaved = false;
		isLoadingRemove = false;
	}
</script>

<div class="flex justify-start mt-4">
	<Sheet.Root open={isSheetOpen}>
		{#if displayMode === 'home'}
			<Sheet.Trigger class="text-primary text-sm font-semibold cursor-pointer"
				><div class="flex flex-col max-w-56 w-56">
					<!-- Book cover -->
					<div class="mb-4">
						<img src={book.cover} alt={book.title} class="h-56 w-auto" />
					</div>

					<div class="flex flex-col justify-start mt-2">
						<!-- Book -->
						<div class="text-left">
							<h2 class="text-base font-semibold">{book.title}</h2>
							<p class="text-xs text-muted-foreground mt-1">{book.authors}</p>
							<div class="flex mt-2">
								{#if book.publisher}
									<p class="text-xs text-muted-foreground mr-1">{book.publisher}</p>
								{/if}
								<p class="text-xs text-muted-foreground">({book.publishedDate})</p>
							</div>
						</div>

						<!-- Book details -->
						<p class="pt-4 text-left">+ Details</p>
					</div>
				</div></Sheet.Trigger
			>
		{:else if displayMode === 'search'}
			<Sheet.Trigger class="text-primary text-sm font-semibold cursor-pointer">
				<div class="flex justify-start">
					<!-- Book cover -->
					<div class="h-full w-auto mb-4">
						<img src={book.cover} alt={book.title} class="h-56 w-auto" />
					</div>

					<div class="w-4/5 flex flex-col justify-start ml-8">
						<!-- Book -->
						<div class="text-left">
							<div class="flex items-center">
								<h2 class="text-xl font-semibold">{book.title}</h2>
								{#if $userData.userBooks.books.some((userBook) => userBook.bookId === book.id)}
									<BookCheck class="h-5 w-h-5 text-primary ml-2" />
								{/if}
							</div>
							<p class="text-base text-muted-foreground mt-1">{book.authors}</p>
							<div class="flex mt-2">
								{#if book.publisher}
									<p class="text-sm text-muted-foreground mr-2">{book.publisher}</p>
								{/if}
								<p class="text-sm text-muted-foreground">({book.publishedDate})</p>
							</div>
						</div>

						<!-- Book details -->
						<p class="pt-4 text-left">+ Details</p>
					</div>
				</div>
			</Sheet.Trigger>
		{/if}

		<Sheet.Content class="min-w-[800px] p-16">
			<ScrollArea class="h-[105%] w-full">
				<div class="flex w-full items-start justify-start">
					<!-- Book Cover -->
					<img src={book.cover} alt={book.title} class="h-60 w-auto mb-8" />

					<!-- Actions -->
					<div class="h-60 flex flex-col justify-end ml-4">
						{#if isAlreadySaved}
							<!-- Update book -->
							<Button
								class="mb-2"
								disabled={!isBookChanged() ||
									isLoadingUpdate ||
									isLoadingRemove ||
									isLoadingWhishlist}
								on:click={updateBookInLibrary}
								>{#if isLoadingUpdate}
									<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
								{/if}
								Update Book
							</Button>

							<!-- Delete book -->
							<Button
								class="mb-2"
								disabled={isLoadingUpdate || isLoadingRemove || isLoadingWhishlist}
								on:click={removeBookFromLibrary}
								variant="destructive"
							>
								{#if isLoadingRemove}
									<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
								{/if}
								Remove from library
							</Button>
						{:else}
							<!-- Save book -->
							<Button
								class="mb-2"
								disabled={isLoadingSave || isLoadingWishlist}
								on:click={saveBookToLibrary}
								>{#if isLoadingSave}
									<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
								{/if}
								Add to library
							</Button>
						{/if}

						<!-- TODO: Create function -->
						<!-- <Button variant="outline" disabled={isLoadingSave || isLoadingWishlist}
							>{#if isLoadingWishlist}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Save to whishlist
						</Button> -->
					</div>
				</div>

				<Sheet.Header>
					<!-- Book Title -->
					<div class="flex items-center">
						<Sheet.Title>{book.title}</Sheet.Title>
						{#if isAlreadySaved}
							<BookCheck class="h-5 w-h-5 text-primary ml-2" />
						{/if}
					</div>

					<Sheet.Description>
						<!-- Book Authors and Publishing info -->
						<p class="text-base text-muted-foreground">{book.authors}</p>
						<div class="flex mt-2 mb-4">
							{#if book.publisher}
								<p class="text-sm text-muted-foreground mr-2">{book.publisher}</p>
							{/if}
							<p class="text-sm text-muted-foreground">({book.publishedDate})</p>
						</div>

						<!-- Book Details: ISBN, Pages and Language -->
						<div class="flex flex-col items-start">
							<div class="flex mb-1">
								<p class="text-sm text-muted-foreground font-semibold mr-2">ISBN:</p>
								<p class="text-sm text-muted-foreground">
									{book.isbn13 != '' ? book.isbn13 : book.isbn10}
								</p>
							</div>
							<div class="flex mb-1">
								<p class="text-sm text-muted-foreground font-semibold mr-2">Pages:</p>
								<p class="text-sm text-muted-foreground">
									{book.pageCount}
								</p>
							</div>
							<div class="flex">
								<p class="text-sm text-muted-foreground font-semibold mr-2">Language:</p>
								<p class="text-sm text-muted-foreground">
									{book.language}
								</p>
							</div>
						</div>

						<!-- Book Description -->
						<ScrollArea class="min-h-28 h-28 w-full text-sm text-muted-foreground mt-6"
							>{book.description}</ScrollArea
						>
					</Sheet.Description>
				</Sheet.Header>

				<div class="flex flex-col mt-6 border-t-2 border-primary">
					<!-- Reading Status -->
					<div class="flex items-center mt-6">
						<p class="text-sm text-muted-foreground font-semibold mr-2">Reading status:</p>
						<SingleSelection
							possibleSelections={readingStatusSelection}
							selection={readingStatus}
							onSelectionChange={handleReadingStatusChange}
						/>
					</div>

					<!-- Book Type -->
					<div class="flex items-center mt-1 mb-4">
						<p class="text-sm text-muted-foreground font-semibold mr-2">Book type:</p>
						<SingleSelection
							possibleSelections={bookTypeSelection}
							selection={bookType}
							onSelectionChange={handleBookTypeChange}
						/>
					</div>

					<!-- Tags -->
					<Tags {tags} onTagsChange={handleTagsChange} />

					<!-- Rating -->
					<div class="flex mt-6">
						<!-- <StarRating /> -->
						<StarRating {rating} onRatingChange={handleRatingChange} stars="5" />
					</div>
				</div>
			</ScrollArea>
		</Sheet.Content>
	</Sheet.Root>
</div>
