<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import BookFull from '$lib/components/book/BookFull.svelte';
	import { userData } from '$lib/state/state.svelte';
</script>

<div class="ml-16 pr-36">
	<div class="w-full bg-background mb-4">
		<h1 class="text-3xl font-semibold text-primary">Books</h1>
		<Separator class="h-[0.18rem] mt-2 pr-8 bg-primary" />
	</div>

	<ScrollArea>
		<div class="h-[80vh] w-full flex flex-wrap">
			{#if $userData.userBooks.books.length > 0}
				{#each $userData.userBooks.books as book}
					<div class="flex my-4 ml-1 mr-14">
						<div class="flex my-4 ml-1 mr-14">
							<BookFull bookId={book.id} />
						</div>
					</div>
				{/each}
			{:else}
				<p class="text-center text-lg text-muted-foreground">No books found</p>
			{/if}
		</div>
	</ScrollArea>
</div>
