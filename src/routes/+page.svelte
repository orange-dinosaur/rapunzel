<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { PUBLIC_LANDING_IMAGE } from '$env/static/public';

	// export let form;
	let form = {
		fields: {
			email: '',
			username: '',
			password: ''
		},
		status: 200,
		body: {
			message: ''
		}
	};

	let isLoading = false;
</script>

<div
	class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button href="/register" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Register
	</Button>
	<Button href="/login" variant="ghost" class="absolute right-12 top-4 md:right-28 md:top-8">
		Login
	</Button>

	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url({PUBLIC_LANDING_IMAGE});"
		></div>
	</div>

	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Welcome to tyna</h1>
			</div>
		</div>
	</div>
</div>
