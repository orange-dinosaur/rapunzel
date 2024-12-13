<script>
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/logo.png';
	import { PUBLIC_VERIFY_EMAIL_IMAGE } from '$env/static/public';
	import { applyAction, enhance } from '$app/forms';
	import { Label } from '$lib/components/ui/label/index';
	import Input from '$lib/components/ui/input/input.svelte';
	import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert/index';

	export let form;

	let isLoading = false;
	let password_recovery_completed = false;
</script>

<div class="h-dvh w-dvw px-36 py-12">
	<div class="h-full w-full flex items-center justify-center rounded-[50px] shadow-2xl">
		<div class="h-full w-1/2 rounded-l-[50px] flex items-center justify-center overflow-hidden">
			<img
				src={PUBLIC_VERIFY_EMAIL_IMAGE}
				alt="verify email"
				class="h-auto w-full rounded-l-[50px] bg-cover"
			/>
		</div>

		<div class="h-full w-1/2 rounded-r-[50px] bg-fixed flex flex-col items-center justify-start">
			<div class="w-full px-14 flex items-center justify-end my-12">
				<Button href="/login" variant="ghost" class="mr-2 font-semibold">Login</Button>
			</div>

			<div class="w-full px-14 flex items-center justify-center mb-12">
				<a href="/"><img src={logo} alt="logo" class="h-[100px] w-auto" /></a>
			</div>

			<div class="h-1/2 w-full px-14 flex flex-col items-center justify-between">
				<div class="w-full flex flex-col items-center justify-start">
					<div class="h-1/2 w-full px-14 flex flex-col items-center justify-between">
						<div class="w-full flex flex-col items-center justify-start">
							<form
								method="post"
								action="?/recover_password"
								use:enhance={() => {
									isLoading = true;
									return async ({ result, update }) => {
										isLoading = false;

										if (result.status === 200) {
											password_recovery_completed = true;
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
										<p>Enter your new password</p>
									</div>
									<div class="grid gap-1 pt-3 pb-6">
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
									<Button type="submit" disabled={isLoading} class="font-semibold mb-6">
										{#if isLoading}
											<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
										{/if}
										Update password
									</Button>
								</div>
							</form>
						</div>

						{#if form && form?.status != 200}
							<Alert.Root variant="destructive" class="w-3/5">
								<CircleAlert class="mr-2 h-4 w-4" />
								<Alert.Title>Error</Alert.Title>
								<Alert.Description>{form?.message}</Alert.Description>
							</Alert.Root>
						{:else if password_recovery_completed}
							<Alert.Root class="border-green-700 w-3/5">
								<CircleCheck class="mr-2 h-4 w-4" color="#15803D" />
								<Alert.Title class="text-green-700">Success</Alert.Title>
								<Alert.Description class="text-green-700"
									>Your password has been successfully updated, <a
										href="/login"
										class="underline underline-offset-4 hover:text-primary font-bold"
									>
										login
									</a> to continue using tyna</Alert.Description
								>
							</Alert.Root>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
