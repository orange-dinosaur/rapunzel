<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { LoaderCircle } from 'lucide-svelte';
	import { applyAction, enhance } from '$app/forms';

	export let data;
	const { user, searchString, books } = data;
	let searchStr = searchString;

	let isLoading = false;
</script>

<div class="flex flex-col items-center justify-start pr-8">
	<div class="bg-background fixed z-10">
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

	{#if books.length > 0}
		{#each books as book}
			<div class="w-3/5 py-8 border-b-2 border-primary mt-32">
				<ul>
					<li>
						<img src={book.cover} alt={book.title} class="w-24 h-32" />
					</li>
					<li>
						<strong>Title:</strong>
						{book.title}
					</li>
					<li>
						<strong>Author:</strong>
						{book.author}
					</li>
					<li>
						<strong>Description:</strong>
						{book.description}
					</li>
				</ul>
			</div>
		{/each}
	{:else}
		<p class="text-center text-lg text-muted-foreground mt-32">No books found</p>
	{/if}
</div>
