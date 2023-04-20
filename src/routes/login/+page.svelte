<!-- <main class="relative inset-0">
    <form action="?/login" method="POST">
        <input type="text" name="email" id="email" placeholder="Email" class="input input-bordered w-full max-w-xs" />
        <input type="text" name="password" id="password" placeholder="Password" class="input input-bordered w-full max-w-xs">
        <button class="btn btn-primary">Submit</button>
    </form>
</main> -->

<div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-base-content/10 mx-auto mt-20">
	<div class="mb-8 text-center">
		<h1 class="my-3 text-4xl font-bold">Sign in</h1>
		<p class="text-sm opacity-75">Sign in to access your account</p>
	</div>

	<form action="?/login" method="POST" class="space-y-12 ng-untouched ng-pristine ng-valid">
		<div class="space-y-4">
			<div>
				<label for="email" class="block mb-2 text-sm">Email address</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="leroy@jenkins.com"
					class="w-full px-3 py-2 block text-base-content placeholder:text-neutral-content/50 rounded-lg bg-neutral-content/10 focus:ring-neutral-content focus:outline-none focus:ring focus:ring-opacity-20"
				/>
			</div>
			<div>
				<div class="flex justify-between mb-2">
					<label for="password" class="text-sm">Password</label>
					<a rel="noopener noreferrer" href="#" class="text-xs hover:underline opacity-75"
						>Forgot password?</a
					>
				</div>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="*****"
					class="w-full px-3 py-2 block text-base-content placeholder:text-neutral-content/50 rounded-lg bg-neutral-content/10 focus:ring-neutral-content focus:outline-none focus:ring focus:ring-opacity-20"
				/>
			</div>
		</div>
		<div class="space-y-2">
			<div>
				<button
					type="submit"
					class="w-full px-8 py-3 font-semibold rounded-md bg-primary text-base-100">Sign in</button
				>
			</div>
			<p class="px-6 text-sm text-center opacity-75">
				Don't have an account yet?
				<a rel="noopener noreferrer" href="/register" class="hover:underline text-primary">Sign up</a>.
			</p>
		</div>
	</form>
</div>
