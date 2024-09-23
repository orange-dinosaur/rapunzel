<script lang="ts">
	import { BookFull } from '$lib/types/book/book';
	import BookDetails from './BookDetails.svelte';
	import { userData } from '$lib/state/state.svelte';

	// get the userId and the book from the userState
	let { bookId }: { bookId: string } = $props();
	let bookFull = $userData.userBooks.books.find((b) => b.id === bookId) ?? new BookFull();
</script>

<div class="flex flex-col max-w-56 w-56">
	<BookDetails book={bookFull} displayMode="home" />
</div>
