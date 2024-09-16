<script lang="ts">
	import { BookFull, type BookSearch } from '$lib/types/book/book';
	import BookDetails from './BookDetails.svelte';
	import { BookCheck } from 'lucide-svelte';
	import { userData } from '$lib/state/state.svelte';

	export let book: BookSearch;

	// check if the book is already saved
	// if it is, get the bookFull from the state
	// if it is not, create a new BookFull
	let bookFull = $userData.userBooks.books.some((userBook) => userBook.bookId === book.id)
		? $userData.userBooks.books.find((b) => b.bookId === book.id) ?? BookFull.fromBookSearch(book)
		: BookFull.fromBookSearch(book);
</script>

<!-- Book cover -->
<div class="h-full w-32 w-min-32 mb-4">
	<img src={book.cover} alt={book.title} class="h-48 w-32" />
</div>

<div class="w-4/5 flex flex-col justify-start ml-8">
	<!-- Book -->
	<div>
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
	<BookDetails book={bookFull} />
</div>
