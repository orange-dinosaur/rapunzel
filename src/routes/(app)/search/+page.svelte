<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { LoaderCircle } from 'lucide-svelte';
	import BookSearch from '$lib/components/book/BookSearch.svelte';
	import { BookSearch as BookSearchClass } from '$lib/types/book/book.js';

	let { data } = $props();
	let searchStr = $state(data.searchStr);

	let isLoading = $state(false);

	// transform searched books to BookSearch
	let books = $state(data.books.map((book) => BookSearchClass.fromJSON(book)));

	async function handleSubmition(event: Event) {
		event.preventDefault();
		console.log('SUBMIT');

		isLoading = true;

		data.searchStr = searchStr;

		// Update the URL of the page
		const url = new URL(window.location.href);
		url.searchParams.set('q', searchStr);
		history.pushState({}, '', url); // Push the new URL without reloading the page

		const res = await fetch(`/api/search/books/${searchStr}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const searchResult = await res.json();
		books.splice(0, books.length);
		books = searchResult.map((book: any) => BookSearchClass.fromJSON(book));

		isLoading = false;
	}
</script>

<div class="flex flex-col items-center justify-start pr-8">
	<div class="w-full h-16 bg-background fixed z-10"></div>
	<div class="bg-background fixed z-20">
		<form
			method="post"
			onsubmit={handleSubmition}
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

	{#if books.length > 0}
		{#each books as book (book.id)}
			<div class="w-3/5 py-4 flex">
				<BookSearch {book} />
			</div>
		{/each}
	{:else}
		<p class="text-center text-lg text-muted-foreground mt-32">No books found</p>
	{/if}
</div>
