<template>
	<div class="min-h-screen bg-gray-100">
		<nav class="bg-white shadow-lg p-4">
			<div class="max-w-7xl mx-auto">
				<h1 class="text-2xl font-bold">Recommender System</h1>
			</div>
		</nav>

		<main class="max-w-7xl mx-auto p-4">
			<router-view />
		</main>
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>
