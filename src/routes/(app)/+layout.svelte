<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Search, Home, Book, Bookmark, Star, Award, LoaderCircle } from 'lucide-svelte';
	import { redirect } from '@sveltejs/kit';
	import logo from '$lib/assets/logo.png';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { PUBLIC_AVATAR_BASE_URL } from '$env/static/public';
	import { Toaster } from 'svelte-sonner';
	import { UserBooks } from '$lib/types/book/book.js';
	import { userData, type UserData } from '$lib/state/state.svelte';

	// get the loaded data from the server
	export let data;
	const { user, userBooks } = data;

	// set the state for the user
	const userDataInitialValue: UserData = {
		user: user,
		userBooks: UserBooks.fromJSON(userBooks)
	};
	userData.set(userDataInitialValue);

	let searchString = '';

	let isLoading = false;

	// TODO: make sure that the user object is not null, so that we can access the pages without errors
	let avatarUrl = PUBLIC_AVATAR_BASE_URL + 'rapunzel';
	if (user?.prefs && 'avatar' in user?.prefs) {
		avatarUrl = user.prefs.avatar?.toString() ?? PUBLIC_AVATAR_BASE_URL + 'rapunzel';
	}

	async function logout() {
		const res = await fetch('/api/logout', {
			method: 'POST'
		});

		if (res.ok) {
			// Workaround: redirect to login page
			const location = '/login';
			if (browser) return await goto(location);
			else throw redirect(307, location);
		}
	}

	/**
	 * @param {{ preventDefault: () => void; }} event
	 */
	async function handleSearchSubmit(event: { preventDefault: () => void }) {
		event.preventDefault(); // Prevent default form submission
		isLoading = true; // Show loading spinner
		await goto('/search?searchString=' + searchString); // Navigate to the target page
		isLoading = false; // Hide loading spinner
	}
</script>

<Toaster richColors />

<div class="flex">
	<!-- Left Navigation -->
	<div class="h-dvh fixed z-20 flex items-center justify-start">
		<div class="h-full flex flex-col items-center justify-between mx-8 pt-8">
			<!-- Logo -->
			<a href={'/users/' + user?.$id} on:click={() => (searchString = '')}
				><img src={logo} alt="logo" class="h-11 w-auto" /></a
			>

			<!-- Links -->
			<div class="h-full flex flex-col items-start justify-center">
				<!-- Home -->
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							on:click={() => (searchString = '')}
							href={'/users/' + user?.$id}
							class="${$page.url.pathname === '/users/' + user?.$id
								? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
								: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
						>
							<Home size={24} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Home</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<!-- Books -->
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							on:click={() => (searchString = '')}
							href={'/users/' + user?.$id + '/books'}
							class="${$page.url.pathname === '/users/' + user?.$id + '/books'
								? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
								: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
						>
							<Book size={24} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Books</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<!-- Bookmarks -->
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							on:click={() => (searchString = '')}
							href={'/users/' + user?.$id + '/bookmarks'}
							class="${$page.url.pathname === '/users/' + user?.$id + '/bookmarks'
								? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
								: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
						>
							<Bookmark size={24} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Bookmarks</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<!-- Favorites -->
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							on:click={() => (searchString = '')}
							href={'/users/' + user?.$id + '/favorites'}
							class="${$page.url.pathname === '/users/' + user?.$id + '/favorites'
								? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
								: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
						>
							<Star size={24} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Favorites</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<!-- Awards -->
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							on:click={() => (searchString = '')}
							href={'/users/' + user?.$id + '/awards'}
							class="${$page.url.pathname === '/users/' + user?.$id + '/awards'
								? 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full'
								: 'h-12 min-h-12 w-12 p-0 m-0 mb-2 rounded-full bg-background text-primary hover:text-background'}"
						>
							<Award size={24} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Awards</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</div>

		<div class="h-[calc(100%-4rem)] border-r-[3px] border-primary"></div>
	</div>

	<!-- Main content -->
	<div class="w-full flex flex-col items-start justify-start">
		<!-- Top Navigation -->
		<div class="w-full fixed z-10 bg-background flex items-center justify-between pt-8">
			<a href={'/users/' + user?.$id} on:click={() => (searchString = '')}
				><p class="text-2xl font-bold text-primary pl-36">tyna</p></a
			>

			<div class="flex items-center justify-end mr-8">
				<!-- Search -->
				{#if !$page.url.pathname.startsWith('/search')}
					<form
						on:submit={handleSearchSubmit}
						class="w-[450px] flex border-2 border-primary items-center justify-center rounded-full pl-2 pr-1 mr-16"
					>
						<Input
							id="searchString"
							name="searchString"
							type="search"
							bind:value={searchString}
							placeholder="Search..."
							class="mr-2 my-[2px] border-none font-semibold"
						/>
						<Button type="submit" class="h-9 min-h-9 w-9 min-w-9 p-0 m-0 rounded-full">
							{#if isLoading}
								<LoaderCircle class="h-4 w-4 animate-spin" />
							{:else}
								<Search size={16} />
							{/if}
						</Button>
					</form>
				{/if}

				<!-- Avatar dropdown menu -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="ghost" builders={[builder]} class="relative h-11 w-11 rounded-full">
							<Avatar.Root class="h-11 w-11">
								<Avatar.Image src={avatarUrl} alt="user profile picture" />
								<Avatar.Fallback>SC</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="" align="end">
						<DropdownMenu.Label class="font-normal mr-2 mt-3">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">{user?.name}</p>
								<p class="text-xs leading-none text-muted-foreground">{user?.email}</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<!-- <DropdownMenu.Group>
							<DropdownMenu.Item>Settings</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator /> -->
						<DropdownMenu.Item on:click={logout} class="cursor-pointer">Log out</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
		<div class="w-full h-16 fixed bg-background mt-16"></div>
		<div class="h-full w-[calc(100%-9rem)] ml-36 mt-32"><slot /></div>
	</div>
</div>
