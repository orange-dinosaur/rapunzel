<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { PUBLIC_LANDING_IMAGE } from '$env/static/public';
	import logo from '$lib/assets/logo.png';
</script>

<div class="h-dvh w-dvw px-36 py-12">
	<div class="h-full w-full flex items-center justify-center rounded-[50px] shadow-2xl">
		<div class="h-full w-1/2 rounded-l-[50px] flex items-center justify-center overflow-hidden">
			<img
				src={PUBLIC_LANDING_IMAGE}
				alt="register"
				class="h-auto w-full rounded-l-[50px] bg-cover"
			/>
		</div>

		<div class="h-full w-1/2 rounded-r-[50px] bg-fixed flex flex-col items-center justify-start">
			<div class="w-full px-14 flex items-center justify-end my-12">
				<Button href="/login" variant="ghost" class="mr-2 font-semibold">Login</Button>
				<Button href="/register" variant="ghost" class="mr-2 font-semibold">Register</Button>
			</div>

			<div class="w-full px-14 flex items-center justify-center mb-12">
				<a href="/"><img src={logo} alt="logo" class="h-[100px] w-auto" /></a>
			</div>

			<div class="h-1/2 w-full px-14 flex flex-col items-center justify-between">
				<div class="w-full flex flex-col items-center justify-start">
					<h1 class="text-2xl text-center font-semibold tracking-tight w-3/5">Welcome to tyna</h1>
				</div>
			</div>
		</div>
	</div>
</div>
