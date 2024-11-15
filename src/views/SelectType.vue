<template>
	<div class="max-w-md mx-auto p-6">
		<h2 class="text-xl font-semibold mb-6">
			What would you like recommendations for?
		</h2>
		<div class="space-y-4">
			<button
				@click="selectType('movie')"
				class="btn btn-primary w-full"
			>
				Movies
			</button>
			<button
				@click="selectType('game')"
				class="btn btn-primary w-full"
			>
				Games
			</button>
		</div>
	</div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
	name: "SelectType",
	setup() {
		const router = useRouter();

		const selectType = (type) => {
			// Navigate to initial ratings with the correct type
			router.push(`/initial-ratings/${type}`);
		};

		return {
			selectType,
		};
	},
};
</script>
