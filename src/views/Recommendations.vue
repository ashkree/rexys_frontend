<template>
	<div class="max-w-6xl mx-auto py-8">
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold">
					Recommended {{ type }}s for You
				</h2>
				<button
					@click="goToPreferences"
					class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
				>
					Adjust Preferences
				</button>
			</div>

			<div
				v-if="loading"
				class="text-center py-8"
			>
				Loading recommendations...
			</div>

			<div
				v-else-if="error"
				class="text-red-500 text-center py-8"
			>
				{{ error }}
			</div>

			<div
				v-else-if="recommendations.length === 0"
				class="text-center py-8"
			>
				No recommendations found. Try adjusting your preferences.
			</div>

			<div
				v-else
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
			>
				<div
					v-for="item in recommendations"
					:key="item.id"
					class="bg-gray-50 p-4 rounded-lg"
				>
					<h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
					<p class="text-sm text-gray-600 mb-2">{{ item.genre }}</p>

					<div class="flex flex-wrap gap-2 mb-3">
						<span
							v-for="tag in item.tags"
							:key="tag"
							class="bg-gray-200 px-2 py-1 rounded text-xs"
						>
							{{ tag }}
						</span>
					</div>

					<div class="flex justify-between items-center">
						<div class="flex items-center">
							<span class="text-yellow-400 mr-1">★</span>
							<span class="text-sm"
								>{{ item.rating.toFixed(1) }}/10</span
							>
						</div>
						<div class="text-sm text-indigo-600 font-medium">
							Match: {{ (item.score * 100).toFixed(0) }}%
						</div>
					</div>

					<!-- Additional details based on type -->
					<div
						v-if="type === 'game'"
						class="mt-2 text-sm text-gray-600"
					>
						<div>Cost: ${{ item.cost }}</div>
						<div>
							Popularity: {{ formatPopularity(item.popularity) }}
						</div>
					</div>
					<div
						v-else
						class="mt-2 text-sm text-gray-600"
					>
						<div v-if="item.actors">
							Cast: {{ item.actors.join(", ") }}
						</div>
						<div>
							Popularity: {{ formatPopularity(item.popularity) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "../api";

export default {
	name: "Recommendations",

	setup() {
		const router = useRouter();
		const route = useRoute();
		const recommendations = ref([]);
		const loading = ref(true);
		const error = ref("");

		const type = computed(() => route.params.type);

		onMounted(async () => {
			try {
				const user = JSON.parse(localStorage.getItem("user"));
				if (!user || !user.id) {
					error.value = "User not found. Please log in.";
					return;
				}

				// Fetch preferences from query parameters
				const preferences = {
					genre: route.query.genre || "",
					rating: {
						min: parseFloat(route.query.min_rating) || 0,
						max: parseFloat(route.query.max_rating) || 10,
					},
					tags: route.query.tags ? route.query.tags.split(",") : [],
				};

				// Fetch recommendations from API
				const response =
					type.value === "movie"
						? await api.getMovieRecommendations(user.id, preferences)
						: await api.getGameRecommendations(user.id, preferences);

				recommendations.value = response.recommendations;
			} catch (err) {
				error.value = "Failed to load recommendations. Please try again.";
				console.error(err);
			} finally {
				loading.value = false;
			}
		});

		const formatPopularity = (value) => {
			if (value >= 1000000) {
				return `${(value / 1000000).toFixed(1)}M`;
			}
			if (value >= 1000) {
				return `${(value / 1000).toFixed(1)}K`;
			}
			return value;
		};

		const goToPreferences = () => {
			router.push(`/preferences/${type.value}`);
		};

		return {
			type,
			recommendations,
			loading,
			error,
			formatPopularity,
			goToPreferences,
		};
	},
};
</script>
