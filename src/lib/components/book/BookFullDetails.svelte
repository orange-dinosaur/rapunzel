<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { BookFull, BookToUpdate } from '$lib/types/book/book';
	import StarRating from '$lib/components/rating/StarRating.svelte';
	import Tags from '$lib/components/tags/Tags.svelte';
	import { toast } from 'svelte-sonner';
	import { userData } from '$lib/state/state.svelte';

	// manage if the sheet is open or closed
	let isSheetOpen = $state(false);

	// get the userId and the book from the userState
	let { bookId }: { bookId: string } = $props();
	let userId = $userData.user.$id;
	let bookFull = $userData.userBooks.books.find((b) => b.id === bookId) ?? new BookFull();

	let isReadingStatusChanged = $state(false);
	let isReadingStartDateChanged = $state(false);
	let isReadingEndDateChanged = $state(false);
	let isBookTypeChanged = $state(false);
	let isTagsChanged = $state(false);
	let isRatingChanged = $state(false);

	let isBookChanged = () => {
		return (
			isReadingStatusChanged ||
			isReadingStartDateChanged ||
			isReadingEndDateChanged ||
			isBookTypeChanged ||
			isTagsChanged ||
			isRatingChanged
		);
	};

	let isLoadingUpdate = $state(false);
	let isLoadingRemove = $state(false);
	let isLoadingWhishlist = $state(false);

	let readingStatus = $state(bookFull.readingStatus);

	let readingStartDate = $state(bookFull.readingStartDate);
	let readingEndDate = $state(bookFull.readingEndDate);

	let bookType = $state(bookFull.bookType);

	let tags: string[] = $state(bookFull.tags);
	function handleTagsChange(newTags: string[]) {
		tags = newTags;
		if (newTags !== bookFull.tags) {
			isTagsChanged = true;
		} else {
			isTagsChanged = false;
		}
	}

	let rating: number = $state(bookFull.rating);
	function handleRatingChange(newRating: number) {
		rating = newRating;
		if (newRating !== bookFull.rating) {
			isRatingChanged = true;
		} else {
			isRatingChanged = false;
		}
	}

	async function updateBookInLibrary() {
		// create a book to update object setting only the fields that have changed
		const bookToUpdate = new BookToUpdate({
			readingStatus: isReadingStatusChanged ? readingStatus : undefined,
			readingStartDate: isReadingStartDateChanged ? readingStartDate.toDateString() : undefined,
			readingEndDate: isReadingEndDateChanged ? readingEndDate.toDateString() : undefined,
			bookType: isBookTypeChanged ? bookType : undefined,
			tags: isTagsChanged ? tags : undefined,
			rating: isRatingChanged ? rating : undefined,
			notes: undefined,
			libraryId: undefined
		});
		const bookToUpdateJSON = bookToUpdate.toJSON();

		isLoadingUpdate = true;

		const res = await fetch(`/api/update-book/${userId}/${bookFull.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bookToUpdateJSON)
		});

		if (!res.ok) {
			toast.error('Error updating book');
		} else {
			// update user state
			// TODO: find a better way to update the user state
			const updatedBooksJSON = $userData.userBooks.books.map((b) => {
				if (b.id === bookFull.id) {
					return {
						...b,
						...bookToUpdateJSON
					};
				}
				return b;
			});
			const updatedBooks = updatedBooksJSON.map((b) => BookFull.fromJSON(b));
			$userData.userBooks.books = updatedBooks;

			userData.set({
				user: $userData.user,
				userBooks: $userData.userBooks
			});

			toast.success('Book updated successfully');
		}

		isLoadingUpdate = false;
	}

	async function removeBookFromLibrary() {
		isLoadingRemove = true;

		const res = await fetch(`/api/remove-book/${userId}/${bookFull.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) {
			// display error
			toast.error('Error deleting book');
		} else {
			// update user state
			// TODO: find a better way to update the user state
			const updatedBooks = $userData.userBooks.books.filter((b) => b.id !== bookFull.id);
			$userData.userBooks.books = updatedBooks;

			userData.set({
				user: $userData.user,
				userBooks: $userData.userBooks
			});

			toast.success('Book deleted successfully');

			isSheetOpen = false;
		}

		isLoadingRemove = false;
	}
</script>

<div class="flex justify-start mt-2">
	<Sheet.Root open={isSheetOpen}>
		<Sheet.Trigger class="text-primary text-xs font-semibold" on:click={() => (isSheetOpen = true)}
			>+ Details</Sheet.Trigger
		>
		<Sheet.Content class="min-w-[800px] p-16">
			<ScrollArea class="h-[105%] w-full">
				<div class="flex w-full items-start justify-start">
					<!-- Book Cover -->
					<img src={bookFull.cover} alt={bookFull.title} class="h-60 w-auto mb-8" />

					<!-- Actions (Update ) -->
					<div class="h-60 flex flex-col justify-end ml-4">
						<Button
							class="mb-2"
							disabled={!isBookChanged() ||
								isLoadingUpdate ||
								isLoadingRemove ||
								isLoadingWhishlist}
							on:click={updateBookInLibrary}
							>{#if isLoadingUpdate}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Update Book
						</Button>
						<Button
							class="mb-2"
							disabled={isLoadingUpdate || isLoadingRemove || isLoadingWhishlist}
							on:click={removeBookFromLibrary}
							variant="destructive"
						>
							{#if isLoadingRemove}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Remove from library
						</Button>
						<!-- TODO: Create function -->
						<!-- <Button
							variant="outline"
							disabled={isLoadingUpdate || isLoadingRemove || isLoadingWhishlist}
							>{#if isLoadingWhishlist}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Save to whishlist
						</Button> -->
					</div>
				</div>

				<Sheet.Header>
					<!-- Book Title -->
					<Sheet.Title>{bookFull.title}</Sheet.Title>

					<Sheet.Description>
						<!-- Book Authors and Publishing info -->
						<p class="text-base text-muted-foreground">{bookFull.authors}</p>
						<div class="flex mt-2 mb-4">
							{#if bookFull.publisher}
								<p class="text-sm text-muted-foreground mr-2">{bookFull.publisher}</p>
							{/if}
							<p class="text-sm text-muted-foreground">({bookFull.publishedDate})</p>
						</div>

						<!-- Book Details: ISBN, Pages and Language -->
						<div class="flex flex-col items-start">
							<div class="flex mb-1">
								<p class="text-sm text-muted-foreground font-semibold mr-2">ISBN:</p>
								<p class="text-sm text-muted-foreground">
									{bookFull.isbn13 != '' ? bookFull.isbn13 : bookFull.isbn10}
								</p>
							</div>
							<div class="flex mb-1">
								<p class="text-sm text-muted-foreground font-semibold mr-2">Pages:</p>
								<p class="text-sm text-muted-foreground">
									{bookFull.pageCount}
								</p>
							</div>
							<div class="flex">
								<p class="text-sm text-muted-foreground font-semibold mr-2">Language:</p>
								<p class="text-sm text-muted-foreground">
									{bookFull.language}
								</p>
							</div>
						</div>

						<!-- Book Description -->
						<ScrollArea class="min-h-28 h-28 w-full text-sm text-muted-foreground mt-6"
							>{bookFull.description}</ScrollArea
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
								if (v && v.value !== bookFull.readingStatus) {
									isReadingStatusChanged = true;
								} else {
									isReadingStatusChanged = false;
								}
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
                            if (v && v.value !== bookFull.bookType) {
                                isBookTypeChanged = true;
                            } else {
                                isBookTypeChanged = false;
                            }
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
