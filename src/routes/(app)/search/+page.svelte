<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { LoaderCircle } from 'lucide-svelte';
	import { applyAction, enhance } from '$app/forms';
	import BookSearch from '$lib/components/book/BookSearch.svelte';

	let { data } = $props();
	let searchStr = $state(data.searchString);

	let isLoading = $state(false);
</script>

<div class="flex flex-col items-center justify-start pr-8">
	<div class="w-full h-16 bg-background fixed z-10"></div>
	<div class="bg-background fixed z-20">
		<form
			method="post"
			use:enhance={() => {
				isLoading = true;
				return async ({ result, update }) => {
					isLoading = false;

					if (result.status === 200) {
						update();
					} else {
						await applyAction(result);
					}

					update();
				};
			}}
			class="w-[550px] flex border-2 border-primary items-center justify-center rounded-lg p-1"
		>
			<Input
				id="searchStr"
				name="searchStr"
				type="search"
				bind:value={searchStr}
				placeholder="Search..."
				class="h-12 border-none font-semibold pl-3 text-md"
			/>
			<Button type="submit" class="h-12"
				>{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}Search</Button
			>
		</form>
	</div>

	<span class="h-32"></span>

	{#if data.books.length > 0}
		{#each data.books as book}
			<div class="w-3/5 py-8 flex">
				<BookSearch
					{book}
					alreadySaved={data.userBooks.some((userBook) => userBook.id === book.id)}
				/>
			</div>
		{/each}
	{:else}
		<p class="text-center text-lg text-muted-foreground mt-32">No books found</p>
	{/if}
</div>
