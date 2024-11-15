<template>
	<form
		@submit.prevent="submitPreferences"
		class="space-y-6"
	>
		<div>
			<label class="block text-sm font-medium text-gray-700">Genre</label>
			<select
				v-model="preferences.genre"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			>
				<option value="">Select a genre</option>
				<option
					v-for="genre in genres"
					:key="genre"
				>
					{{ genre }}
				</option>
			</select>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700"
				>Rating Range</label
			>
			<div class="flex gap-4">
				<input
					v-model="preferences.rating.min"
					type="number"
					min="0"
					max="10"
					step="0.5"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				/>
				<input
					v-model="preferences.rating.max"
					type="number"
					min="0"
					max="10"
					step="0.5"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				/>
			</div>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700"
				>Tags (comma separated)</label
			>
			<input
				v-model="tagInput"
				type="text"
				placeholder="action, drama, sci-fi"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			/>
		</div>

		<button
			type="submit"
			class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
		>
			Get Recommendations
		</button>
	</form>
</template>

<script>
import { ref, computed } from "vue";

export default {
	name: "MovieForm",
	emits: ["submit"],

	setup(props, { emit }) {
		const preferences = ref({
			genre: "",
			rating: { min: 0, max: 10 },
			tags: [],
		});

		const tagInput = ref("");
		const genres = [
			"Action",
			"Drama",
			"Comedy",
			"Sci-Fi",
			"Horror",
			"Romance",
		];

		const submitPreferences = () => {
			preferences.value.tags = tagInput.value
				.split(",")
				.map((tag) => tag.trim());
			emit("submit", preferences.value);
		};

		return {
			preferences,
			tagInput,
			genres,
			submitPreferences,
		};
	},
};
</script>
