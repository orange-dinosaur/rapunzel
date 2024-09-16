<script lang="ts">
	import { BookFull } from '$lib/types/book/book';
	import BookDetails from './BookDetails.svelte';
	import { userData } from '$lib/state/state.svelte';

	// get the userId and the book from the userState
	let { bookId }: { bookId: string } = $props();
	let bookFull = $userData.userBooks.books.find((b) => b.id === bookId) ?? new BookFull();
</script>

<div class="flex flex-col max-w-56 w-56">
	<!-- Book cover -->
	<div class="mb-4">
		<img src={bookFull.cover} alt={bookFull.title} class="h-56 w-auto" />
	</div>

	<div class="flex flex-col justify-start mt-2">
		<!-- Book -->
		<div>
			<h2 class="text-base font-semibold">{bookFull.title}</h2>
			<p class="text-xs text-muted-foreground mt-1">{bookFull.authors}</p>
			<div class="flex mt-2">
				{#if bookFull.publisher}
					<p class="text-xs text-muted-foreground mr-1">{bookFull.publisher}</p>
				{/if}
				<p class="text-xs text-muted-foreground">({bookFull.publishedDate})</p>
			</div>
		</div>

		<!-- Book details -->
		<BookDetails book={bookFull} />
	</div>
</div>
