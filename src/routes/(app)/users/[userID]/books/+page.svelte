<script>
	import BookFull from '$lib/components/book/BookFull.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	export let data;

	const { user, userBooks } = data;
</script>

<!-- User Books -->
<div class="ml-16 pr-36">
	<div class="w-full bg-background mb-4">
		<h1 class="text-3xl font-semibold text-foreground">Books</h1>
		<Separator class="h-1 mt-2 pr-8 bg-foreground" />
	</div>

	<ScrollArea>
		<div class="h-[80vh] w-full flex flex-wrap">
			{#if userBooks.length > 0}
				{#each userBooks as book}
					<div class="flex my-4 ml-1 mr-12">
						<BookFull {book} />
					</div>
				{/each}
			{:else}
				<p class="text-center text-lg text-muted-foreground mt-32">No books found</p>
			{/if}
		</div>
	</ScrollArea>
</div>
