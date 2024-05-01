<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { LoaderCircle } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { applyAction, enhance } from '$app/forms';
	import { PUBLIC_REGISTER_IMAGE } from '$env/static/public';

	export let form;

	let isLoading = false;
</script>

<div
	class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button href="/login" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Login
	</Button>

	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url({PUBLIC_REGISTER_IMAGE});"
		></div>
	</div>

	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create your account</h1>
			</div>

			<form
				method="post"
				use:enhance={() => {
					isLoading = true;
					return async ({ result, update }) => {
						isLoading = false;

						console.log(result);

						if (result.status === 200) {
							update();
							window.location.href = '/users/giulio';
						} else {
							await applyAction(result);
						}

						update();
					};
				}}
			>
				<div class="grid gap-2">
					<div class="grid gap-1">
						<Label class="sr-only" for="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={form?.fields.email ?? ''}
							placeholder="name@example.com"
							autocapitalize="none"
							autocomplete="email"
							autocorrect="off"
							disabled={isLoading}
						/>
					</div>
					<div class="grid gap-1">
						<Label class="sr-only" for="email">Username</Label>
						<Input
							id="username"
							name="username"
							type="text"
							value={form?.fields.username ?? ''}
							placeholder="username"
							autocapitalize="none"
							autocomplete="username"
							autocorrect="off"
							disabled={isLoading}
							required
						/>
					</div>
					<div class="grid gap-1">
						<Label class="sr-only" for="password">Pasword</Label>
						<Input
							id="password"
							name="password"
							type="password"
							value={form?.fields.password ?? ''}
							placeholder="*************"
							autocapitalize="none"
							autocomplete="password"
							autocorrect="off"
							disabled={isLoading}
						/>
					</div>
					<Button type="submit" disabled={isLoading} class="font-semibold">
						{#if isLoading}
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Register
					</Button>
					<div class="grid gap-1">
						{#if form?.status != 200}
							<p class="text-red-500 font-medium">{form?.body.message}</p>
						{/if}
					</div>
				</div>
			</form>

			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
