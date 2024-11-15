<template>
	<div class="bg-white rounded-lg shadow p-4 mb-4">
		<h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
		<div class="mb-4">
			<p class="text-sm text-gray-600">{{ item.genre }}</p>
			<div class="flex gap-2 mt-2">
				<span
					v-for="tag in item.tags"
					:key="tag"
					class="bg-gray-100 text-xs px-2 py-1 rounded"
				>
					{{ tag }}
				</span>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<template
					v-for="i in 5"
					:key="i"
				>
					<button
						@click="updateRating(i)"
						class="text-2xl focus:outline-none"
						:class="
							i <= rating ? 'text-yellow-400' : 'text-gray-300'
						"
					>
						★
					</button>
				</template>
			</div>
			<span class="text-sm text-gray-600"
				>Your rating: {{ rating }}/5</span
			>
		</div>
	</div>
</template>

<script>
import { ref, watch } from "vue";

export default {
	name: "RatingCard",
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	emits: ["rating-updated"],

	setup(props, { emit }) {
		const rating = ref(0);

		const updateRating = (value) => {
			rating.value = value;
			emit("rating-updated", {
				id: props.item.id,
				rating: value * 2, // Convert to 10-point scale
			});
		};

		return { rating, updateRating };
	},
};
</script>
