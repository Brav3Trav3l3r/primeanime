<script>
	import { Twitch, Home, Search, Library, Triangle, Bell, LogOut } from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import { profile } from '$lib/store/supaStore.js';
	import { page } from '$app/stores';

	const defImage =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjPYqeqLttVyAnM2WourMJhY_7Fgq8OOSjkA&usqp=CAU';
</script>

<div class="main px-4 menu py-8 w-72 flex flex-col gap-8 bg-black text-base-content">
	<div class="profile flex gap-4">
		{#if $page.data.session}
			<div class="avatar items-center">
				<div class="w-12 rounded-full ">
					<img src={$profile?.avatar_url ?? defImage} alt="profile" />
				</div>
			</div>

			<div class="greet flex flex-col flex-1 justify-end">
				<h1 class="opacity-50 text-sm font-semibold">Hello ,</h1>
				<div class="username flex items-center gap-4">
					<a href="/profile" class="text-xl font-semibold tracking-wide"
						>{$profile?.username ?? 'Mr. Kitty'}</a
					>

					<form method="POST" action="/logout" class="flex items-end">
						<button type="submit" class="opacity-70 hover:opacity-100 hover:text-red-500" role="menuitem">
							<LogOut size="16" />
						</button>
					</form>
				</div>
			</div>
		{:else}
			<a href="/login" class="w-full bg-base-content/30 rounded items-center flex justify-center h-12">
				<h1 class="text-md">Login</h1>
			</a>
		{/if}
	</div>

	<!-- <input type="text" placeholder="Search" class="input placeholder-zinc-500 rounded-md bg-zinc-900/80 w-full max-w-xs" /> -->
	<div class="relative flex items-center ">
		<span class="absolute left-3 text-neutral-content/50">
			<Search size="20" />
		</span>

		<input
			type="email"
			placeholder="Search"
			class="block w-full py-2.5 text-base-content placeholder:text-neutral-content/50 rounded pl-11 pr-6 rtl:pr-11 rtl:pl-5 bg-neutral-content/10 focus:ring-neutral-content focus:outline-none focus:ring focus:ring-opacity-20"
		/>
	</div>

	<div
		class="mainlinks mt-4 space-y-4 text-sm font-medium border-b-2 pb-4 border-neutral-content/10"
	>
		<h1 class="pb-2 text-xs font-semibold tracking-widest opacity-60">DASHBORD</h1>
		<div class="home flex items-center space-x-4 w-fit cursor-pointer  hover:brightness-150">
			<div class="icon">
				<Home size="22" />
			</div>
			<a href="/" class="tracking-wider text-sm">Home</a>
		</div>
		<div class="home flex items-center space-x-4 cursor-pointer w-fit  hover:brightness-150">
			<div class="icon">
				<Bell size="22" />
			</div>
			<a href="#" class="tracking-wider text-sm ">Notifications</a>
		</div>
		<div class="home flex items-center space-x-4 cursor-pointer w-fit  hover:brightness-150">
			<div class="icon">
				<Library size="22" />
			</div>
			<a href="/library" class="tracking-wider text-sm">Library</a>
		</div>
	</div>
</div>
