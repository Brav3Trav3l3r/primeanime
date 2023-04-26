<script>
	export let data;
	$: anime = data.anime;
	$: color = data.color;
	$: title = data.title;
	$: query = data.query;
	$: paramsId = data.paramsId;

	import { page } from '$app/stores';

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
	import { currentProvider, continueWatching } from '$lib/store/store.js';
	import { afterNavigate } from '$app/navigation';

	let box;

	let filterd = [];
	let currentAnimeObj;
	let availableInContinue = false;

	const getFilterdWatching = async () => {
		currentAnimeObj = await $continueWatching.find((obj) => obj['id'] === $page.data.paramsId);
		if (currentAnimeObj) {
			availableInContinue = true;
			filterd = currentAnimeObj?.eps.map((episode) => {
				return { number: episode.number, percent: episode.percent };
			});
		} else {
			availableInContinue = false;
			filterd = [];
		}
	};

	afterNavigate(() => getFilterdWatching());

	getFilterdWatching();
</script>

<div class="main relative">
	<!-- <h1>{anime.id}</h1> -->
	<div class="cover hidden md:block xl:h-[350px] h-60 md:h-80  sticky top-0 z-0">
		<Cover {anime} {color} />
	</div>

	<div class="title hidden md:block absolute xl:h-[350px] h-60 md:h-80 inset-0 z-10">
		<Title {anime} {title} />
	</div>

	<div class="content relative top-0 bg-base-100 inset-x-0 z-10">
		<div class="content ">
			<div
				style:background-image="linear-gradient(0deg, transparent, {color || 'gray'}"
				class="gradient h-64 absolute inset-x-0 top-0 brightness-[0.4] "
			/>

			<div class="group-1 relative z-20 top-14 md:top-0">
				<!-- <div class=" relative z-20 p-6">
					<Controls {anime} {paramsId} {query} {currentAnimeObj} {availableInContinue} />
				</div> -->

				<TabGroup
					class="relative z-10 "
					on:change={(e) => console.log('Changed selected tab to:', e.detail)}
				>
					<TabList
						as="div"
						bind:this={box}
						role="list"
						class="flex border-b-2 border-base-content/10 bg-base-100/50 backdrop-blur-md  items-center gap-2 md:gap-3 h-16 sticky top-[-1px] z-10 px-3 md:px-6 "
					>
						<Tab let:selected>
							<span class={selected ? 'text-accent font-medium' : 'font-medium  '}>
								Info
							</span>
						</Tab>

						<ChevronRight size="16" strokeWidth="3" color="#636061" />

						<Tab let:selected>
							<span class={selected ? 'text-accent font-medium' : 'font-medium '}
								>Episodes</span
							>
						</Tab>

						<ChevronRight size="16" strokeWidth="3" color="#636061" />

						<Tab let:selected>
							<span class={selected ? 'text-accent font-medium' : 'font-medium '}>
								Comments
							</span>
						</Tab>
					</TabList>

					<TabPanels class=" relative z-0 p-3 md:p-6 ">
						<TabPanel class="focus:outline-none">
							<Info {anime} {title} />
						</TabPanel>
						<TabPanel class="focus:outline-none">
							<Episodes {filterd} {anime} on:updateWatching={getFilterdWatching} />
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
