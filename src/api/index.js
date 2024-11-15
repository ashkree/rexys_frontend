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
		const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Use environment variable

		onMounted(async () => {
			try {
				const response = await fetch(
					`${apiBaseUrl}/ratings/${props.type}s/initial`
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
				await fetch(`${apiBaseUrl}/ratings/rate/${props.type}s`, {
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
				});
				router.push(`/preferences/${props.type}`);
			} catch (err) {
				console.error("Error submitting ratings:", err);
			}
		};

		return { items, updateRating, submitRatings, ratings };
	},
};
