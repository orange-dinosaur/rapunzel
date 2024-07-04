<script>
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Badge } from '$lib/components/ui/badge';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';

	export let book;
</script>

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
