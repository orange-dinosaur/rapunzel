<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { BookToSave } from '$lib/types/book/book';
	import StarRating from '../rating/StarRating.svelte';
	import Tags from '../tags/Tags.svelte';

	let isLoadingSave = $state(false);
	let isLoadingWishlist = $state(false);

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

	async function saveBookToLibrary() {
		const bookToSave = new BookToSave({
			bookId: book.id,
			readingStatus,
			bookType,
			tags,
			rating
		}).toPlainObject();

		isLoadingSave = true;

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
			isLoadingSave = false;
		}
	}
</script>

<div class="flex justify-start mt-4">
	<Sheet.Root>
		<Sheet.Trigger class="text-primary text-sm font-semibold">+ Details</Sheet.Trigger>
		<Sheet.Content class="min-w-[800px] p-16">
			<ScrollArea class="h-[105%] w-full">
				<div class="flex w-full items-start justify-start">
					<!-- Book Cover -->
					<img src={book.cover} alt={book.title} class="h-60 w-auto mb-8" />

					<!-- Actions (Add to library or Save to whishlist) -->
					<div class="h-60 flex flex-col justify-end ml-4">
						<Button
							class="mb-2"
							disabled={isLoadingSave || isLoadingWishlist}
							on:click={saveBookToLibrary}
							>{#if isLoadingSave}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Add to library
						</Button>
						<!-- TODO: Create function -->
						<!-- <Button variant="outline" disabled={isLoadingSave || isLoadingWishlist}
							>{#if isLoadingWishlist}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Save to whishlist
						</Button> -->
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
						<ScrollArea class="min-h-28 h-28 w-full text-sm text-muted-foreground mt-6"
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
					<div class="flex items-center mt-1 mb-6">
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
					<Tags {tags} onTagsChange={handleTagsChange} />

					<!-- Rating -->
					<div class="flex mt-8">
						<!-- <StarRating /> -->
						<StarRating {rating} onRatingChange={handleRatingChange} stars="5" />
					</div>
				</div>
			</ScrollArea>
		</Sheet.Content>
	</Sheet.Root>
</div>
