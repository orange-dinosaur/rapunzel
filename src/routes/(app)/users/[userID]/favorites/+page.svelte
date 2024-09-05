<script>
	import { Separator } from '$lib/components/ui/separator';
	import { userData } from '$lib/state/state.svelte';

	export let data;

	const { user, userBooks } = data;
</script>

<div class="ml-16 pr-36">
	<div class="w-full bg-background mb-4">
		<h1 class="text-3xl font-semibold text-primary">Favorites Page - Work in progress</h1>
		<Separator class="h-[0.18rem] mt-2 pr-8 bg-primary" />
	</div>

	<div class="h-full w-full">
		<ul>
			<li>
				<strong>Email:</strong>
				{$userData.user.email}
			</li>
			<li>
				<strong>Name:</strong>
				{$userData.user.name}
			</li>
		</ul>
	</div>
</div>
