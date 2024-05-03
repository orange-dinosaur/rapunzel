<script>
	import { PUBLIC_VERIFY_EMAIL_IMAGE } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

<div
	class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url({PUBLIC_VERIFY_EMAIL_IMAGE});"
		></div>
	</div>

	<div class="lg:p-8">
		<div class="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
			{#if data.data.status !== 200}
				<div class="flex flex-col space-y-2 text-left">
					<h1 class="text-2xl font-semibold tracking-tight text-red-700">{data.data.message}</h1>
				</div>
			{:else}
				<div class="flex flex-col space-y-2 text-left">
					<h1 class="text-2xl font-semibold tracking-tight text-green-700">
						Your email has been successfully validated, you can now login to your account. Enjoy
						tyna!
					</h1>
				</div>
				<Button href="/login" class="font-semibold w-fit">Login</Button>
			{/if}
		</div>
	</div>
</div>
