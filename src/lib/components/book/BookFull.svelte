<script>
	import BookFullDetails from './BookFullDetails.svelte';

	export let book;
</script>

<div class="flex flex-col">
	<!-- Book cover -->
	<div class="h-full">
		<img src={book.cover} alt={book.title} class="h-56 w-auto" />
	</div>

	<div class="flex flex-col justify-start mt-2">
		<!-- Book -->
		<div>
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
		<BookFullDetails {book} />
	</div>
</div>
