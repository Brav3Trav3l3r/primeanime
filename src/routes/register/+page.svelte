<!-- <main>
    <h1>Register</h1>

    <form action="?/register" method="POST">
        <label for="email">Email</label>
        <input name="email" type="text">
        <label for="password">Password</label>
        <input name="password" type="password">
        <button>Register</button>
    </form>
</main> -->

<div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-base-content/10 mx-auto mt-20">
	<div class="mb-8 text-center">
		<h1 class="my-3 text-4xl font-bold">Sign up</h1>
		<p class="text-sm opacity-75">Sign up to access your account</p>
	</div>

	<form action="?/register" method="POST" class="space-y-12 ng-untouched ng-pristine ng-valid">
		<div class="space-y-4">
			<div>
				<label for="email" class="block mb-2 text-sm">Email address</label>
				<input type="email" name="email" id="email" placeholder="leroy@jenkins.com" class="w-full px-3 py-2 block text-base-content placeholder:text-neutral-content/50 rounded-lg bg-neutral-content/10 focus:ring-neutral-content focus:outline-none focus:ring focus:ring-opacity-20">
			</div>
			<div>
				<div class="flex justify-between mb-2">
					<label for="password" class="text-sm">Password</label>
				</div>
				<input type="password" name="password" id="password" placeholder="*****" class="w-full px-3 py-2 block text-base-content placeholder:text-neutral-content/50 rounded-lg bg-neutral-content/10 focus:ring-neutral-content focus:outline-none focus:ring focus:ring-opacity-20">
			</div>
		</div>
		<div class="space-y-2">
			<div>
				<button type="button" class="w-full px-8 py-3 font-semibold rounded-md bg-primary text-base-100">Sign up</button>
			</div>
			
		</div>
	</form>
</div>