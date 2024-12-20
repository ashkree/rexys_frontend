<template>
	<div class="max-w-2xl mx-auto py-8">
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<h2 class="text-2xl font-bold mb-6">
				What kind of {{ type }}s do you like?
			</h2>

			<form
				@submit.prevent="handleSubmit"
				class="space-y-6"
			>
				<!-- Genre Selection -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2"
						>Genre</label
					>
					<select
						v-model="preferences.genre"
						class="w-full p-2 border border-gray-300 rounded-md"
						required
					>
						<option value="">Select a genre</option>
						<option
							v-for="genre in genres"
							:key="genre"
							:value="genre"
						>
							{{ genre }}
						</option>
					</select>
				</div>

				<!-- Rating Range -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2"
						>Rating Range</label
					>
					<div class="flex gap-4">
						<div class="flex-1">
							<label class="text-xs text-gray-500">Min</label>
							<input
								v-model.number="preferences.rating.min"
								type="number"
								min="0"
								max="10"
								step="0.5"
								class="w-full p-2 border border-gray-300 rounded-md"
							/>
						</div>
						<div class="flex-1">
							<label class="text-xs text-gray-500">Max</label>
							<input
								v-model.number="preferences.rating.max"
								type="number"
								min="0"
								max="10"
								step="0.5"
								class="w-full p-2 border border-gray-300 rounded-md"
							/>
						</div>
					</div>
				</div>

				<!-- Tags -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2"
						>Tags (comma separated)</label
					>
					<input
						v-model="tagInput"
						type="text"
						placeholder="action, adventure, fantasy"
						class="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
					:disabled="loading"
				>
					{{
						loading
							? "Getting Recommendations..."
							: "Get Recommendations"
					}}
				</button>

				<div
					v-if="error"
					class="text-red-500 text-center"
				>
					{{ error }}
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
	name: "Preferences",

	setup() {
		const router = useRouter();
		const route = useRoute();
		const type = computed(() => route.params.type); // Get the type from the route
		const loading = ref(false);
		const error = ref("");
		const tagInput = ref("");

		const preferences = ref({
			genre: "",
			rating: {
				min: 0,
				max: 10,
			},
			tags: [],
		});

		// Watch for tag input changes to update preferences
		watch(tagInput, (newTags) => {
			preferences.value.tags = newTags.split(",").map((tag) => tag.trim());
		});

		// Genres based on type
		const genres = computed(() => {
			return type.value === "movie"
				? ["Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance", "Adventure", "Thriller"]
				: ["RPG", "Action", "Strategy", "Sports", "Adventure", "Simulation", "FPS", "Puzzle"];
		});

		const handleSubmit = () => {
			try {
				loading.value = true;
				error.value = "";

				// Redirect to the Recommendations page with query parameters
				router.push({
					path: `/recommendations/${type.value}`,
					query: {
						genre: preferences.value.genre,
						min_rating: preferences.value.rating.min,
						max_rating: preferences.value.rating.max,
						tags: preferences.value.tags.join(","),
					},
				});
			} catch (err) {
				error.value = "Failed to navigate to recommendations. Please try again.";
			} finally {
				loading.value = false;
			}
		};

		return {
			type,
			preferences,
			genres,
			tagInput,
			loading,
			error,
			handleSubmit,
		};
	},
};
</script>
