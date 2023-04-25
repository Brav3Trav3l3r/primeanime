<script>
	import { profile } from '$lib/store/supaStore.js';
	import { Edit3 } from 'lucide-svelte';
</script>

<div class="main relative">
	<div class="cover h-72 w-full fixed top-0 z-0">
		<img
			src="https://cdnb.artstation.com/p/assets/images/images/029/363/725/4k/shin-w-16-9-2.jpg?1597300886"
			class="object-cover h-full w-full"
			alt=""
		/>
	</div>

	<div class="main top-72 h-96 bg-base-100 w-full relative z-10 ">
		<div
			class="profile aspect-square rounded-full relative bottom-24 truncate left-8 w-48 border-8 border-base-100"
		>
			<img src={$profile?.avatar_url} class="w-full h-full object-cover" alt="profile" />
		</div>
		<div class="info-section relative bottom-20 space-y-2 px-10">
			<div class="flex gap-4 items-center">
				<h1 class="text-lg font-medium text-white">{$profile?.username}</h1>
				<div class="icon">
					<Edit3 size=20 color='gray'/>
				</div>
			</div>
			<h1 class="text-sm opacity-80">24 liked / 123 completed</h1>
		</div>

        
	</div>
</div>
