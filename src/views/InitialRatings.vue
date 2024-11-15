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
				const response = await fetch(
					`http://localhost:5000/ratings/${props.type}s/initial`
				);
				if (!response.ok)
					throw new Error(`Failed to fetch: ${response.status}`);
				items.value = await response.json();
			} catch (err) {
				console.error("Error:", err);
			}
		});

		const updateRating = ({ id, rating }) => {
			ratings.value[id] = rating;
		};

		const submitRatings = async () => {
			try {
				const user = JSON.parse(localStorage.getItem("user"));
				await fetch(
					`http://localhost:5000/ratings/rate/${props.type}s`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							user_id: user.id,
							ratings: Object.entries(ratings.value).map(
								([id, rating]) => ({
									[`${props.type}_id`]: id,
									rating,
								})
							),
						}),
					}
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
