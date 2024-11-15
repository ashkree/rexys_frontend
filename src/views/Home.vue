<template>
	<div class="flex justify-center items-center min-h-[80vh]">
		<div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
			<h2 class="text-2xl font-bold mb-6 text-center">
				{{ isRegistering ? "Create Account" : "Welcome Back" }}
			</h2>

			<form
				@submit.prevent="handleSubmit"
				class="space-y-4"
			>
				<div>
					<label class="block text-sm font-medium text-gray-700"
						>Username</label
					>
					<input
						v-model="username"
						type="text"
						required
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
					/>
				</div>

				<div
					v-if="error"
					class="text-red-500 text-sm"
				>
					{{ error }}
				</div>

				<button
					type="submit"
					class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
				>
					{{ isRegistering ? "Register" : "Login" }}
				</button>

				<p class="text-center text-sm text-gray-600">
					{{
						isRegistering
							? "Already have an account?"
							: "Don't have an account?"
					}}
					<button
						@click="isRegistering = !isRegistering"
						type="button"
						class="text-indigo-600 hover:text-indigo-500"
					>
						{{ isRegistering ? "Login" : "Register" }}
					</button>
				</p>
			</form>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "../api";

export default {
	name: "Home",
	setup() {
		const router = useRouter();
		const username = ref("");
		const error = ref("");
		const isRegistering = ref(false);

		const handleSubmit = async () => {
			try {
				console.log("Form submitted", {
					isRegistering: isRegistering.value,
					username: username.value,
				});

				const response = await (isRegistering.value
					? api.register(username.value)
					: api.login(username.value));

				if (response.error) {
					error.value = response.error;
					return;
				}

				localStorage.setItem(
					"user",
					JSON.stringify({
						id: response.user_id,
						username: username.value,
					})
				);

				router.push("/select-type");
			} catch (err) {
				console.error("Error:", err);
				error.value = "An error occurred. Please try again.";
			}
		};

		return {
			username,
			error,
			isRegistering,
			handleSubmit,
		};
	},
};
</script>
