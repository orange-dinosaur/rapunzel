<script>
	import BookFull from '$lib/components/book/BookFull.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { ScanEyeIcon } from 'lucide-svelte';

	export let data;

	const { user, userBooks } = data;
</script>

<div class="h-full w-full">
	<!-- <ul>
		<li>
			<strong>Email:</strong>
			{user.email}
		</li>
		<li>
			<strong>Name:</strong>
			{user.name}
		</li>
		<li>
			<strong>ID: </strong>
			{user.$id}
		</li>
	</ul>

	<form method="post">
		<button type="submit">Log out</button>
	</form> -->

	<!-- Currently reading section -->

	<!-- Currently listening -->

	<!-- User Books -->
	<div class="pr-20">
		<div class="w-full bg-background mb-4">
			<h1 class="text-3xl font-semibold text-foreground">Books</h1>
			<Separator class="h-1 mt-2 pr-8 bg-foreground" />
		</div>

		<ScrollArea>
			<div class="h-[80vh] w-full flex flex-wrap">
				{#if userBooks.length > 0}
					{#each userBooks as book}
						<div class="flex my-4 ml-1 mr-4">
							<BookFull {book} />
						</div>
					{/each}
				{:else}
					<p class="text-center text-lg text-muted-foreground mt-32">No books found</p>
				{/if}
			</div>
		</ScrollArea>
	</div>
</div>
