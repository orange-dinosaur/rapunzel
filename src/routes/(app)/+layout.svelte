<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Search, Home, Book, Bookmark, Star, Award } from 'lucide-svelte';
	import { redirect } from '@sveltejs/kit';
	import logo from '$lib/assets/logo.png';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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
	async function handleSearchSubmit(event) {
		event.preventDefault(); // Prevent default form submission
		await goto('/search?searchString=' + searchString); // Navigate to the target page
	}
</script>

<div class="flex">
	<!-- Left Navigation -->
	<div class="h-dvh fixed z-10 flex items-center justify-start">
		<!-- Links -->
		<div class="w-full flex flex-col items-start justify-center mx-8">
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
		<div class="h-full border-r-2 border-primary mb-32"></div>
	</div>

	<!-- Main content -->
	<div class="w-full flex flex-col items-start justify-start">
		<!-- Top Navigation -->
		<div class="w-full fixed z-10 bg-background flex items-center justify-between py-8 px-8">
			<!-- Logo -->
			<a href={'/users/' + user?.$id}><img src={logo} alt="logo" class="h-11 w-auto" /></a>

			<div class="flex items-center justify-end">
				<!-- Search -->
				{#if !$page.url.pathname.startsWith('/search')}
					<form
						on:submit={handleSearchSubmit}
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
						<Button type="submit" class="h-9 min-h-9 w-9 min-w-9 p-0 m-0 rounded-full">
							<Search size={16} />
						</Button>
					</form>
				{/if}

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
					<DropdownMenu.Content class="" align="end">
						<DropdownMenu.Label class="font-normal mr-2 mt-3">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">{user?.name}</p>
								<p class="text-xs leading-none text-muted-foreground">{user?.email}</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>Settings</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={logout}>Log out</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
		<div class="h-full ml-32 mt-32"><slot /></div>
	</div>
</div>
