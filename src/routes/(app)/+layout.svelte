<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Search, Home, Book, Bookmark, Star, Award } from 'lucide-svelte';
	import { redirect } from '@sveltejs/kit';
	import logo from '$lib/assets/logo.png';

	export let data;

	let searchString = '';

	// TODO: make sure that the user object is not null, so that we can access the pages without errors
	const { user } = data;
	let avatarUrl = 'https://source.boringavatars.com/marble/120/Maria%20Mitchell';
	if (user?.prefs && 'avatar' in user?.prefs) {
		avatarUrl =
			user.prefs.avatar?.toString() ??
			'https://source.boringavatars.com/marble/120/Maria%20Mitchell';
	}
</script>

<div class="h-dvh w-dvw flex">
	<div class="h-full flex flex-col items-center justify-start px-8">
		<!-- Logo -->
		<a href={'/users/' + user?.$id}><img src={logo} alt="logo" class="h-11 w-auto mt-4" /></a>

		<!-- Links -->
		<div class="w-auto flex flex-col items-center justify-center mt-64">
			<Button
				href={'/users/' + user?.$id}
				class="${$page.url.pathname === '/users/' + user?.$id
					? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
					: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
			>
				<Home size={24} />
			</Button>
			<Button
				href={'/users/' + user?.$id + '/books'}
				class="${$page.url.pathname === '/users/' + user?.$id + '/books'
					? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
					: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
			>
				<Book size={24} />
			</Button>
			<Button
				href={'/users/' + user?.$id + '/bookmarks'}
				class="${$page.url.pathname === '/users/' + user?.$id + '/bookmarks'
					? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
					: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
			>
				<Bookmark size={24} />
			</Button>
			<Button
				href={'/users/' + user?.$id + '/favorites'}
				class="${$page.url.pathname === '/users/' + user?.$id + '/favorites'
					? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
					: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
			>
				<Star size={24} />
			</Button>
			<Button
				href={'/users/' + user?.$id + '/awards'}
				class="${$page.url.pathname === '/users/' + user?.$id + '/awards'
					? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
					: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
			>
				<Award size={24} />
			</Button>
		</div>
	</div>

	<div class=" w-0 border-r-2 border-primary my-4"></div>

	<div class="h-full w-full flex flex-col">
		<div class="w-full flex items-center justify-between py-4">
			<!-- App name -->
			<div>
				<h1 class="font-bold text-primary text-2xl ml-8">tyna</h1>
			</div>

			<div class="w-full flex items-center justify-end">
				<!-- Search -->
				<form
					on:submit={() => console.log('searching for:', searchString)}
					class="w-[450px] flex border-2 border-primary items-center justify-center rounded-full pl-2 pr-1 mr-24"
				>
					<Input
						id="searchString"
						name="searchString"
						type="search"
						bind:value={searchString}
						placeholder="Search..."
						class="mr-2 my-[2px] border-none font-semibold"
					/>
					<Button
						href={'/search?searchString=' + searchString}
						class="h-9 min-h-9 w-9 min-w-9 p-0 m-0 rounded-full"
					>
						<Search size={16} />
					</Button>
				</form>

				<!-- Avatar dropdown menu -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							variant="ghost"
							builders={[builder]}
							class="relative h-11 w-11 rounded-full mr-8"
						>
							<Avatar.Root class="h-11 w-11">
								<Avatar.Image src={avatarUrl} alt="user profile picture" />
								<Avatar.Fallback>SC</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="end">
						<DropdownMenu.Label class="font-normal">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">{user?.name}</p>
								<p class="text-xs leading-none text-muted-foreground">{user?.email}</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								Profile
								<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								Settings
								<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							Log out
							<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<div class="h-full w-full pl-8 pt-8">
			<slot />
		</div>
	</div>
</div>
