<script lang="ts">
	import { BookFull, type BookSearch } from '$lib/types/book/book';
	import BookDetails from './BookDetails.svelte';
	import { userData } from '$lib/state/state.svelte';

	export let book: BookSearch;

	// check if the book is already saved
	// if it is, get the bookFull from the state
	// if it is not, create a new BookFull
	let bookFull = $userData.userBooks.books.some((userBook) => userBook.bookId === book.id)
		? $userData.userBooks.books.find((b) => b.bookId === book.id) ?? BookFull.fromBookSearch(book)
		: BookFull.fromBookSearch(book);
</script>

<BookDetails book={bookFull} displayMode="search" />
