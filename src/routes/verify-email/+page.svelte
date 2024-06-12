<script>
	import { PUBLIC_VERIFY_EMAIL_IMAGE } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/logo.jpg';

	export let data;
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
				<Button href="/register" variant="ghost" class="mr-2 font-semibold">Register</Button>
			</div>

			<div class="w-full px-14 flex items-center justify-center mb-12">
				<a href="/"><img src={logo} alt="logo" class="h-[100px] w-auto" /></a>
			</div>

			<div class="h-1/2 w-full px-14 flex flex-col items-center justify-between">
				<div class="w-full flex flex-col items-center justify-start">
					{#if data.data.status !== 200}
						<div class="flex flex-col space-y-2 text-left w-3/5">
							<h1 class="text-2xl font-semibold tracking-tight text-red-700">
								{data.data.message}
							</h1>
						</div>
					{:else}
						<div class="flex flex-col space-y-2 text-left w-3/5">
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
	</div>
</div>
