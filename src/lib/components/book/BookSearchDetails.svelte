<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Badge } from '$lib/components/ui/badge';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { BookSaved } from '$lib/types/book/book';
	import StarRating from '../rating/StarRating.svelte';

	let { book }: { book: any } = $props();

	let readingStatus = $state('to-read');
	let bookType = $state('book');

	let tags: string[] = $state([]);
	function handleTagsChange(newTags: string[]) {
		tags = newTags;
	}

	let rating: number = $state(2);
	function handleRatingChange(newRating: number) {
		rating = newRating;
	}

	let tag = $state('');
	let isAddingTag = $state(false);

	async function saveBookToLibrary() {
		const bookToSave = new BookSaved({
			id: book.id,
			readingStatus,
			bookType,
			tags,
			rating
		}).toPlainObject();

		console.log('--------------------------------------------');
		console.log(bookToSave);
		console.log('--------------------------------------------');

		const res = await fetch('/api/save-book', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				bookToSave
			})
		});

		if (res.ok) {
			console.log('RES OK');
		}
	}
</script>

<div class="flex justify-start mt-4">
	<Sheet.Root>
		<Sheet.Trigger class="text-primary text-sm font-semibold">+ Details</Sheet.Trigger>
		<Sheet.Content class="min-w-[800px] p-16">
			<div class="flex w-full items-start justify-start">
				<!-- Book Cover -->
				<img src={book.cover} alt={book.title} class="h-60 w-auto mb-8" />

				<!-- Actions (Add to library or Save to whishlist) -->
				<div class="h-60 flex flex-col justify-end ml-4">
					<Button class="mb-2" on:click={saveBookToLibrary}>Add to library</Button>
					<Button variant="outline">Save to whishlist</Button>
				</div>
			</div>

			<Sheet.Header>
				<!-- Book Title -->
				<Sheet.Title>{book.title}</Sheet.Title>

				<Sheet.Description>
					<!-- Book Authors and Publishing info -->
					<p class="text-base text-muted-foreground">{book.authors}</p>
					<div class="flex mt-2 mb-4">
						{#if book.publisher}
							<p class="text-sm text-muted-foreground mr-2">{book.publisher}</p>
						{/if}
						<p class="text-sm text-muted-foreground">({book.publishedDate})</p>
					</div>

					<!-- Book Details: ISBN, Pages and Language -->
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

					<!-- Book Description -->
					<ScrollArea class="min-h-40 h-32 w-full text-sm text-muted-foreground mt-6"
						>{book.description}</ScrollArea
					>
				</Sheet.Description>
			</Sheet.Header>

			<div class="flex flex-col mt-6 border-t-2 border-primary">
				<!-- Reading Status -->
				<div class="flex items-center mt-6">
					<p class="text-sm text-muted-foreground font-semibold mr-2">Reading status:</p>
					<Select.Root
						selected={readingStatus ? { label: readingStatus, value: readingStatus } : undefined}
						onSelectedChange={(v) => {
							v && (readingStatus = v.value as string);
						}}
					>
						<Select.Trigger class="w-[180px] text-sm">
							<Select.Value placeholder={readingStatus as string} />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="to-read">to-read</Select.Item>
							<Select.Item value="reading">reading</Select.Item>
							<Select.Item value="completed">completed</Select.Item>
							<Select.Item value="dnf">dnf</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>

				<!-- Book Type -->
				<div class="flex items-center mt-1">
					<p class="text-sm text-muted-foreground font-semibold mr-2">Book type:</p>
					<Select.Root
						selected={bookType ? { label: bookType, value: bookType } : undefined}
						onSelectedChange={(v) => {
                        v && (bookType = v.value as string);
                    }}
					>
						<Select.Trigger class="w-[180px] text-sm">
							<Select.Value placeholder={bookType} />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="book">book</Select.Item>
							<Select.Item value="e-book">e-book</Select.Item>
							<Select.Item value="audiobook">audiobook</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>

				<!-- Tags -->
				<div class="flex items-center mt-3">
					<div class="flex">
						{#each tags as tag}
							<Badge class="mr-2"
								>{tag} |
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<!-- svelte-ignore event_directive_deprecated -->
								<div
									class="mx-2 cursor-pointer"
									onclick={() => {
										tags = tags.filter((t) => t !== tag);
									}}
								>
									x
								</div></Badge
							>
						{/each}

						{#if !isAddingTag}
							<Button
								variant="ghost"
								class="text-sm text-primary font-semibold rounded-full"
								on:click={() => (isAddingTag = true)}>+</Button
							>
						{:else}
							<div class="flex items-center">
								<input
									id="tag"
									name="tag"
									type="text"
									bind:value={tag}
									placeholder="tag"
									class="w-32 border-b-2 border-primary bg-transparent px-2 mr-2 text-sm"
									onkeydown={(e) => {
										if (e.key === 'Enter') {
											tags.push(tag);
											tag = '';
											isAddingTag = false;
										}
									}}
								/>
								<Button
									variant="default"
									class="text-sm"
									on:click={() => {
										tags.push(tag);
										tag = '';
										isAddingTag = false;
									}}>v</Button
								>
								<Button
									variant="destructive"
									class="text-sm ml-1"
									on:click={() => {
										tag = '';
										isAddingTag = false;
									}}>x</Button
								>
							</div>
						{/if}
					</div>
				</div>

				<!-- Rating -->
				<div class="flex mt-4">
					<!-- <StarRating /> -->
					<StarRating {rating} onRatingChange={handleRatingChange} stars="5" />
				</div>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</div>
