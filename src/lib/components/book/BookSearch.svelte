<script>
	import BookSearchDetails from './BookSearchDetails.svelte';

	export let book;
</script>

<!-- Book cover -->
<div class="h-full w-32 w-min-32">
	<img src={book.cover} alt={book.title} class="h-48 w-32" />
</div>

<div class="w-4/5 flex flex-col justify-start ml-8">
	<!-- Book -->
	<div>
		<h2 class="text-xl font-semibold">{book.title}</h2>
		<p class="text-base text-muted-foreground mt-1">{book.authors}</p>
		<div class="flex mt-2">
			{#if book.publisher}
				<p class="text-sm text-muted-foreground mr-2">{book.publisher}</p>
			{/if}
			<p class="text-sm text-muted-foreground">({book.publishedDate})</p>
		</div>
	</div>

	<!-- Book details -->
	<BookSearchDetails {book} />
</div>
