<script lang="ts">
	import { goto } from '$app/navigation';

	let username = $state('');
	let error = $state('');

	const examples = ['torvalds', 'rich-harris', 'sindresorhus', 'gaearon'];

	function submit() {
		const val = username.trim();
		if (!val) { error = 'Enter a GitHub username'; return; }
		error = '';
		goto(`/${val}`);
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') submit();
	}
</script>

<svelte:head>
	<title>GitFolio — GitHub Portfolio Generator</title>
</svelte:head>

<main class="min-h-screen flex flex-col">
	<!-- Nav -->
	<nav class="flex items-center justify-between px-6 py-4 border-b border-white/10">
		<span class="font-bold text-lg tracking-tight text-white">
			<span class="text-emerald-400">Git</span>Folio
		</span>
		<a
			href="https://github.com/macos-node/macos-node.github.io"
			target="_blank"
			rel="noopener"
			class="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
		>
			<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
			</svg>
			GitHub
		</a>
	</nav>

	<!-- Hero -->
	<section class="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
			<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
			Free · Open Source · No sign-up
		</div>

		<h1 class="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl">
			Transform your
			<span class="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"> GitHub </span>
			into a portfolio
		</h1>

		<p class="text-lg text-white/50 mb-12 max-w-xl">
			Enter any GitHub username and instantly generate a beautiful, shareable developer portfolio page.
		</p>

		<!-- Search -->
		<div class="w-full max-w-md">
			<div class="flex gap-2">
				<div class="relative flex-1">
					<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
					</svg>
					<input
						type="text"
						placeholder="GitHub username"
						bind:value={username}
						{onkeydown}
						class="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-all"
					/>
				</div>
				<button
					onclick={submit}
					class="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors shrink-0"
				>
					Generate
				</button>
			</div>
			{#if error}
				<p class="text-red-400 text-sm mt-2 text-left">{error}</p>
			{/if}

			<div class="flex flex-wrap gap-2 mt-4 justify-center items-center">
				<span class="text-white/30 text-sm">Try:</span>
				{#each examples as ex}
					<button
						onclick={() => { username = ex; goto(`/${ex}`); }}
						class="text-sm text-emerald-400/70 hover:text-emerald-400 transition-colors"
					>
						{ex}
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 pb-16 max-w-4xl mx-auto w-full">
		{#each [
			{ icon: '⚡', title: 'Instant', desc: 'Portfolio generated in seconds from the GitHub API' },
			{ icon: '🎨', title: 'Beautiful', desc: 'Clean, modern design that looks great on any device' },
			{ icon: '🔗', title: 'Shareable', desc: 'Every portfolio has a unique URL you can share anywhere' },
		] as f}
			<div class="rounded-xl border border-white/8 bg-white/3 p-5">
				<div class="text-2xl mb-2">{f.icon}</div>
				<div class="font-semibold mb-1">{f.title}</div>
				<div class="text-sm text-white/40">{f.desc}</div>
			</div>
		{/each}
	</section>

	<footer class="text-center text-sm text-white/25 pb-6">
		Built with <a href="https://svelte.dev" class="hover:text-white/50 transition-colors">Svelte</a> · Powered by GitHub API
	</footer>
</main>
