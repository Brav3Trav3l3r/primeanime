<script>
	export let data;
	$: anime = data.anime;
	$: color = data.color;
	$: title = data.title;
	$: query = data.query;
	$: paramsId = data.paramsId

	import {
		Tab,
		TabGroup,
		TabList,
		TabPanel,
		TabPanels,
		Disclosure,
		DisclosureButton,
		DisclosurePanel
	} from '@rgossiaux/svelte-headlessui';
	import Controls from '../../lib/components/id/Controls.svelte';
	import Cover from '../../lib/components/id/Cover.svelte';
	import Info from '../../lib/components/id/Info.svelte';
	import Title from '../../lib/components/id/Title.svelte';
	import Episodes from '../../lib/components/id/Episodes.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let box;
	
	onMount(()=>{
		
	})
</script>

<div class="main relative">
	<!-- <h1>{anime.id}</h1> -->
	<div  class="cover h-[350px] sticky top-0 z-0">
		<Cover {anime} {color}/>
	</div>

	<div class="title absolute h-[350px] inset-0 z-10">
		<Title {anime} {title} />
	</div>

	<div class="content relative top-0 bg-base-100 inset-x-0 z-10">
		<div class="content ">
			<div
				style:background-image="linear-gradient(0deg, transparent, {color || 'gray'}"
				class="gradient h-64 absolute inset-x-0 top-0 brightness-[0.3] "
			/>

			<div class="group-1 relative z-20 ">
				<div class=" relative z-20 p-6">
					<Controls {anime} {paramsId} {query}/>
				</div>

				<TabGroup class="relative z-10">
					<TabList
					as="div"
					bind:this={box}
						role="list"
						class="flex items-center gap-2 h-16 sticky top-[-1px] z-10 bg-base-300/80 px-6 backdrop-blur-md"
					>
						<Tab let:selected>
							<span class={selected ? 'text-base-content font-semibold' : 'opacity-40'}> Info </span>
						</Tab>

						<ChevronRight size="16" strokeWidth="3" color="#636061" />

						<Tab let:selected>
							<span class={selected ? 'text-base-content font-semibold' : 'opacity-40'}>Episodes</span>
						</Tab>

						<ChevronRight size="16" strokeWidth="3" color="#636061" />

						<Tab let:selected>
							<span class={selected ? 'text-base-content font-semibold' : 'opacity-40'}> Comments </span>
						</Tab>
					</TabList>
	

					<TabPanels class=" relative z-0 p-6 ">
						<TabPanel class="focus:outline-none">
							<Info {anime} {title} />
						</TabPanel>
						<TabPanel class="focus:outline-none">
							<Episodes {anime} />
						</TabPanel>
						<TabPanel class="focus:outline-none">
							<div class="antialiased max-w-screen-sm">

								<div class="space-y-4">
									<div class="flex">
										<div class="flex-shrink-0 mr-3">
											<img
												class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
												src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
												alt=""
											/>
										</div>
										<div
											class="flex-1 border border-base-content/30 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
										>
											<strong class="opacity-70 ">Sarah</strong>
											<span class="text-xs pl-1 opacity-70">3:34 PM</span>
											<p class="">
												Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
												eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
												voluptua.
											</p>
											<div class="mt-4 flex items-center">
												<div class="flex -space-x-2 mr-2">
													<img
														class="rounded-full w-6 h-6 border border-white"
														src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
														alt=""
													/>
													<img
														class="rounded-full w-6 h-6 border border-white"
														src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
														alt=""
													/>
												</div>
												<div class="text-sm font-semibold opacity-70">5 Replies</div>
											</div>
										</div>
									</div>

									<div class="flex">
										<div class="flex-shrink-0 mr-3">
											<img
												class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
												src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
												alt=""
											/>
										</div>
										<Disclosure
											class="flex-1 border border-base-content/30 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
										>
											<strong class="opacity-70">Sarah</strong>
											<span class="text-xs pl-1 opacity-70">3:34 PM</span>
											<p class="">
												Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
												eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
												voluptua.
											</p>

											<DisclosureButton class="mt-4 flex items-center">
												<div class="flex -space-x-2 mr-2">
													<img
														class="rounded-full w-6 h-6 border border-white"
														src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
														alt=""
													/>
													<img
														class="rounded-full w-6 h-6 border border-white"
														src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
														alt=""
													/>
												</div>
												<div class="text-sm font-semibold opacity-70">2 Replies</div>
											</DisclosureButton>

											<DisclosurePanel class="space-y-4 mt-4">
												<div class="flex">
													<div class="flex-shrink-0 mr-3">
														<img
															class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
															src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
															alt=""
														/>
													</div>
													<div
														class="flex-1 bg-base-content/10 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
													>
														<strong class="opacity-70">Sarah</strong>
														<span class="text-xs opacity-70 pl-1">3:34 PM</span>
														<p class="text-sm sm:text-sm">
															Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
															nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
															sed diam voluptua.
														</p>
													</div>
												</div>
												<div class="flex">
													<div class="flex-shrink-0 mr-3">
														<img
															class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
															src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
															alt=""
														/>
													</div>
													<div
														class="flex-1 bg-base-content/10 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
													>
														<strong class="opacity-70">Sarah</strong>
														<span class="text-xs opacity-70 pl-1">3:34 PM</span>
														<p class="text-xs sm:text-sm">
															Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
															nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
															sed diam voluptua.
														</p>
													</div>
												</div>
											</DisclosurePanel>
										</Disclosure>
									</div>
								</div>
							</div>
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
		</div>
	</div>
</div>


<style>
	
.is-pinned {
  color: red;
}
</style>