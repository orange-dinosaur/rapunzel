<script lang="ts">
	import BookFullDetails from './BookFullDetails.svelte';
	import BookSearchDetails from './BookSearchDetails.svelte';
	import { BookCheck } from 'lucide-svelte';

	export let book;
	export let alreadySaved: boolean;
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
			{#if alreadySaved}
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
	{#if alreadySaved}
		<BookFullDetails {book} />
	{:else}
		<BookSearchDetails {book} />
	{/if}
</div>
