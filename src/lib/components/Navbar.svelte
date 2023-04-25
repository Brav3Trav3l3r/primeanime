<script>
	import {
		Twitch,
		Home,
		Search,
		Library,
		Triangle,
		Bell,
		LogOut,
		RotateCcw,
		CalendarClock,
		Grid,
		LayoutDashboard
	} from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import { profile } from '$lib/store/supaStore.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {enhance} from '$app/forms'
</script>

<div
	class="main menu w-72 flex flex-col space-y-6 py-6 bg-base-300 border-r-2 border-base-content/20 text-base-content"
>
	<div class="profile px-4">
		{#if $page.data.session}
			<div class="main items-center bg-base-content/5 p-3 rounded-lg flex gap-4">
				<div class="avatar items-center">
					<div class="w-12 rounded-full truncate">
						<img src={$profile?.avatar_url} alt="profile" />
					</div>
				</div>

				<div class="greet flex flex-col flex-1 justify-end">
					<h1 class="opacity-50 text-sm font-semibold">Hello ,</h1>
					<div class="username flex items-center gap-4">
						<a href="/profile" class="text-lg font-medium tracking-wide"
							>{$profile?.username ?? 'Mr. Kitty'}</a
						>

						<form method="POST" action="/logout" class="flex items-end">
							<button
								type="submit"
								class="opacity-70 hover:opacity-100 hover:text-red-500"
								role="menuitem"
							>
								<LogOut size="16" />
							</button>
						</form>
					</div>
				</div>
			</div>
		{:else}
			<a
				href="/login"
				class="w-full bg-accent hover:bg-accent-focus text-neutral font-medium rounded items-center flex justify-center h-12"
			>
				<h1 class="text-md">Login</h1>
			</a>
		{/if}
	</div>

	<form method="POST" action="/search" use:enhance class="relative flex items-center px-4">
		<!-- <span class="absolute left-3 text-neutral-content/70">
			<Search size="20" />
		</span> -->

		<input
			type="search"
			name="query"
			placeholder="Search"
			class="input placeholder:text-base-content/60 bg-base-content/10 rounded-md w-full max-w-xs"
		/>
	</form>

	<div class="mainlinks space-y-4 text-sm">
		<h1 class="pb-2 text-xs font-semibold tracking-widest opacity-50 p-4">MENU</h1>
		{#if $page.url.pathname === '/'}
			<div
				class="icon text-3xl flex items-end space-x-4 border-l-2 pl-4 text-primary border-primary box-border"
			>
				<LayoutDashboard />
				<a href="/" class="tracking-wider text-sm ">Home</a>
			</div>
		{:else}
			<div class="icon text-3xl flex items-end space-x-4 pl-4 opacity-50">
				<LayoutDashboard />
				<a href="/" class="tracking-wider text-sm">Home</a>
			</div>
		{/if}

		{#if $page.url.pathname === '/airing-status'}
			<div
				class="icon text-3xl flex items-end space-x-4 border-l-2 pl-4 text-primary border-secondary box-border"
			>
				<CalendarClock />
				<a href="airing-status" class="tracking-wider text-sm">Airing Status</a>
			</div>
		{:else}
			<div class="icon text-3xl flex items-end space-x-4 pl-4 opacity-50">
				<CalendarClock />
				<a href="airing-status" class="tracking-wider text-sm ">Airing Status</a>
			</div>
		{/if}
		{#if $page.url.pathname === '/continue-watching'}
			<div
				class="icon text-3xl flex items-end space-x-4 border-l-2 pl-4 text-primary border-secondary box-border"
			>
				<RotateCcw />
				<a href="/continue-watching" class="tracking-wider text-sm">Continue watching</a>
			</div>
		{:else}
			<div class="icon text-3xl flex items-end space-x-4 pl-4 opacity-50">
				<RotateCcw />
				<a href="/continue-watching" class="tracking-wider text-sm ">Continue watching</a>
			</div>
		{/if}
	</div>

	{#if $profile}
		<div class="extra-links space-y-4 py-6 bg-neutral-content/10 border-neutral-content/20">
			{#if $page.url.pathname === '/library'}
				<div
					class="icon text-3xl flex items-end space-x-4 text-primary border-l-2 pl-4 border-secondary box-border"
				>
					<Library />
					<a href="/library" class="tracking-wider text-sm">Library</a>
				</div>
			{:else}
				<div class="icon text-3xl flex items-end space-x-4 pl-4 opacity-60">
					<Library />
					<a href="/library" class="tracking-wider text-sm">Library</a>
				</div>
			{/if}
			{#if $page.url.pathname === '/notification'}
				<div
					class="icon text-3xl flex items-end space-x-4 border-l-2 pl-4 text-primary border-secondary box-border"
				>
					<Bell />
					<a href="/notification" class="tracking-wider text-sm ">Notifications</a>
				</div>
			{:else}
				<div class="icon text-3xl flex items-end space-x-4 pl-4 opacity-60">
					<Bell />
					<a href="/notification" class="tracking-wider text-sm ">Notifications</a>
				</div>
			{/if}
		</div>
	{/if}
</div>
