<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Badge } from '$lib/components/ui/badge';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { LoaderCircle } from 'lucide-svelte';
	import { applyAction, enhance } from '$app/forms';

	export let data;
	const { user, searchString, books } = data;
	let searchStr = searchString;

	let isLoading = false;
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

	{#if books.length > 0}
		{#each books as book}
			<div class="w-3/5 py-8 flex">
				<!-- Book cover -->
				<div class="h-full w-32 w-min-32">
					<img src={book.cover} alt={book.title} class="h-48 w-32" />
				</div>

				<!-- Book -->
				<div class="w-4/5 flex flex-col justify-start ml-8">
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
					<div class="flex justify-start mt-4">
						<Sheet.Root>
							<Sheet.Trigger class="text-primary text-sm font-semibold">+ Details</Sheet.Trigger>
							<Sheet.Content class="min-w-[800px] p-16">
								<div class="flex w-full items-start justify-start">
									<img src={book.cover} alt={book.title} class="h-60 w-auto mb-8" />
									<div class="h-60 flex flex-col justify-end ml-4">
										<Button class="mb-2">Add to library</Button>
										<Button variant="outline">Save to whishlist</Button>
									</div>
								</div>
								<Sheet.Header>
									<Sheet.Title>{book.title}</Sheet.Title>
									<Sheet.Description>
										<p class="text-base text-muted-foreground">{book.authors}</p>
										<div class="flex mt-2 mb-4">
											{#if book.publisher}
												<p class="text-sm text-muted-foreground mr-2">{book.publisher}</p>
											{/if}
											<p class="text-sm text-muted-foreground">({book.publishedDate})</p>
										</div>

										<div class="flex flex-col items-start">
											<div class="flex mb-1">
												<p class="text-sm text-muted-foreground font-semibold mr-2">ISBN:</p>
												<p class="text-sm text-muted-foreground">
													{book.isbn13 != '' ? book.isbn13 : book.isbn10}
												</p>
											</div>
											<div class="flex mb-1">
												<p class="text-sm text-muted-foreground font-semibold mr-2">Pages:</p>
												<p class="text-sm text-muted-foreground">
													{book.pageCount}
												</p>
											</div>
											<div class="flex">
												<p class="text-sm text-muted-foreground font-semibold mr-2">Language:</p>
												<p class="text-sm text-muted-foreground">
													{book.language}
												</p>
											</div>
										</div>

										<ScrollArea class="min-h-40 h-32 w-full text-sm text-muted-foreground mt-6"
											>{book.description}</ScrollArea
										>
									</Sheet.Description>
								</Sheet.Header>

								<div class="flex flex-col mt-6 border-t-2 border-primary">
									<div class="flex items-center mt-6">
										<p class="text-sm text-muted-foreground font-semibold mr-2">Reading status:</p>
										<Select.Root>
											<Select.Trigger class="w-[180px] text-sm">
												<Select.Value placeholder="to read" />
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="to-read">To read</Select.Item>
												<Select.Item value="reading">Reading</Select.Item>
												<Select.Item value="completed">Completed</Select.Item>
												<Select.Item value="dnf">DNF</Select.Item>
											</Select.Content>
										</Select.Root>
									</div>
									<div class="flex items-center mt-1">
										<p class="text-sm text-muted-foreground font-semibold mr-2">Book type:</p>
										<Select.Root>
											<Select.Trigger class="w-[180px] text-sm">
												<Select.Value placeholder="book" />
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="book">Book</Select.Item>
												<Select.Item value="e-book">E-Book</Select.Item>
												<Select.Item value="audiobook">Audiobook</Select.Item>
											</Select.Content>
										</Select.Root>
									</div>
									<div class="flex items-center mt-3">
										<div class="flex">
											<!-- TODO: possibility to add new tags -->
											<Badge variant="outline">+</Badge>
										</div>
									</div>
									<div class="flex mt-4">
										<p class="text-sm text-muted-foreground font-semibold mr-2">Stars:</p>
										<p class="text-sm text-muted-foreground">
											{book.language}
										</p>
									</div>
								</div>
							</Sheet.Content>
						</Sheet.Root>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<p class="text-center text-lg text-muted-foreground mt-32">No books found</p>
	{/if}
</div>
