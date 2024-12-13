<script lang="ts">
	import { LoaderCircle, CircleAlert } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { applyAction, enhance } from '$app/forms';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { PUBLIC_LOGIN_IMAGE } from '$env/static/public';
	import logo from '$lib/assets/logo.png';

	export let form;

	let isLoading = false;
	let recoveryAlreadySent = false;
</script>

<div class="h-dvh w-dvw px-36 py-12">
	<div class="h-full w-full flex items-center justify-center rounded-[50px] shadow-2xl">
		<div class="h-full w-1/2 rounded-l-[50px] flex items-center justify-center overflow-hidden">
			<img src={PUBLIC_LOGIN_IMAGE} alt="login" class="h-auto w-full rounded-l-[50px] bg-cover" />
		</div>

		<div class="h-full w-1/2 rounded-r-[50px] bg-fixed flex flex-col items-center justify-start">
			<div class="w-full px-14 flex items-center justify-end my-12">
				<Button href="/register" variant="ghost" class="mr-2 font-semibold">Register</Button>
			</div>

			<div class="w-full px-14 flex items-center justify-center mb-12">
				<a href="/"><img src={logo} alt="logo" class="h-[100px] w-auto" /></a>
			</div>

			<div class="h-1/2 w-full px-14 flex flex-col items-center justify-between">
				<div class="w-full flex flex-col items-center justify-start">
					<form
						method="post"
						action="?/login"
						use:enhance={() => {
							isLoading = true;
							return async ({ result, update }) => {
								isLoading = false;

								if (result.status === 200) {
									update();
								} else {
									await applyAction(result);
								}

								update();
							};
						}}
						class="w-3/5"
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
									class="bg-transparent focus:border-b-2 focus:border-b-primary outline-none"
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
									class="bg-transparent focus:border-b-2 focus:border-b-primary outline-none"
								/>
							</div>
							<Button type="submit" disabled={isLoading} class="font-semibold">
								{#if isLoading}
									<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
								{/if}
								Login
							</Button>
						</div>
					</form>

					<Dialog.Root>
						<Dialog.Trigger on:click={() => (recoveryAlreadySent = false)} class="cursor-pointer"
							><p class="text-center text-sm text-blue-900 mt-6 w-full">
								Forget your password?
							</p></Dialog.Trigger
						>
						<Dialog.Content class="h-64">
							<form
								method="post"
								action="?/recover_password"
								use:enhance={() => {
									isLoading = true;
									return async ({ result, update }) => {
										if (result.status === 200) {
											update();
										} else {
											await applyAction(result);
										}

										update();
										isLoading = false;
										recoveryAlreadySent = true;
									};
								}}
							>
								{#if recoveryAlreadySent}
									<p class="text-base pt-12">An email have been sent to recover your password</p>
								{:else}
									<Dialog.Header class="py-6">
										<p class="text-base">Insert your email to receive a recovery link</p>
									</Dialog.Header>
									<div class="grid gap-4 py-4">
										<div class="grid grid-cols-4 items-center gap-4">
											<Label for="email" class="text-right">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={form?.fields.email ?? ''}
												placeholder="name@example.com"
												autocapitalize="none"
												autocomplete="email"
												autocorrect="off"
												class="col-span-3"
											/>
										</div>
									</div>
									<Dialog.Footer class="pt-4">
										<Button type="submit" disabled={isLoading} class="font-semibold">
											{#if isLoading}
												<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
											{/if}
											Recover password
										</Button>
									</Dialog.Footer>
								{/if}
							</form>
						</Dialog.Content>
					</Dialog.Root>

					<p class="px-8 text-center text-sm text-muted-foreground mt-6 w-3/5">
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

				{#if form && form?.status != 200}
					<Alert.Root variant="destructive" class="w-3/5">
						<CircleAlert class="mr-2 h-4 w-4" />
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>{form?.message}</Alert.Description>
					</Alert.Root>
				{/if}
			</div>
		</div>
	</div>
</div>
