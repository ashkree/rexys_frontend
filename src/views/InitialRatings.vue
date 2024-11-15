<template>
	<div class="max-w-2xl mx-auto p-6">
		<h2 class="text-xl font-semibold mb-6">
			Rate some {{ type }}s to get started
		</h2>
		<div class="space-y-4">
			<RatingCard
				v-for="item in items"
				:key="item.id"
				:item="item"
				@rating-updated="updateRating"
			/>
			<button
				@click="submitRatings"
				:disabled="Object.keys(ratings).length < 3"
				class="btn btn-primary w-full"
			>
				Continue
			</button>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "../api"; // Import the updated API module
import RatingCard from "../components/RatingCard.vue";

export default {
	components: { RatingCard },
	props: ["type"],

	setup(props) {
		const router = useRouter();
		const items = ref([]);
		const ratings = ref({});

		onMounted(async () => {
			try {
				const data = await api.getInitialItems(props.type); // Use API module
				items.value = data;
			} catch (err) {
				console.error("Error fetching initial items:", err);
			}
		});

		const updateRating = ({ id, rating }) => {
			ratings.value[id] = rating;
		};

		const submitRatings = async () => {
			try {
				const user = JSON.parse(localStorage.getItem("user"));
				await api.submitRatings(
					props.type,
					user.id,
					Object.entries(ratings.value).map(([id, rating]) => ({
						[`${props.type}_id`]: id,
						rating,
					}))
				);
				router.push(`/preferences/${props.type}`);
			} catch (err) {
				console.error("Error submitting ratings:", err);
			}
		};

		return { items, updateRating, submitRatings, ratings };
	},
};
</script>
