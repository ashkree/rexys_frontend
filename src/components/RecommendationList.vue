<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<div
			v-for="item in items"
			:key="item.id"
			class="bg-white rounded-lg shadow overflow-hidden"
		>
			<div class="p-4">
				<h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
				<div class="mb-3 flex flex-wrap gap-2">
					<span
						v-for="tag in item.tags"
						:key="tag"
						class="bg-gray-100 text-xs px-2 py-1 rounded"
					>
						{{ tag }}
					</span>
				</div>
				<div class="flex justify-between items-center">
					<div class="flex items-center">
						<span class="text-yellow-400 mr-1">★</span>
						<span>{{ item.rating.toFixed(1) }}</span>
					</div>
					<span class="text-sm text-gray-600">
						Match: {{ (item.score * 100).toFixed(0) }}%
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "RecommendationList",
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
};
</script>
