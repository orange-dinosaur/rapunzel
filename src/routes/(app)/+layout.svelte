<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';

	export let data;

	const { user } = data;
	let avatarUrl = 'https://source.boringavatars.com/marble/120/Maria%20Mitchell';
	if (user?.prefs && 'avatar' in user?.prefs) {
		avatarUrl =
			user.prefs.avatar?.toString() ??
			'https://source.boringavatars.com/marble/120/Maria%20Mitchell';
	}
</script>

<div class="bg-primary h-14 mb-4 flex items-center px-4">
	<h1 class="font-bold text-white">tyna</h1>
	<div class="ml-auto flex items-center space-x-4">
		<!-- Search -->
		<Input
			type="search"
			placeholder="Search..."
			class="h-8 md:w-[100px] lg:w-[300px] bg-green-200 border-green-200 text-green-900 focus:border-2 focus:border-green-500"
		/>

		<!-- User Nav -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
					<Avatar.Root class="h-8 w-8">
						<Avatar.Image src={avatarUrl} alt="user profile picture" />
						<Avatar.Fallback>SC</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Label class="font-normal">
					<div class="flex flex-col space-y-1">
						<p class="text-sm font-medium leading-none">shadcn</p>
						<p class="text-xs leading-none text-muted-foreground">m@example.com</p>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						Profile
						<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Billing
						<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Settings
						<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>New Team</DropdownMenu.Item>
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

<slot />
