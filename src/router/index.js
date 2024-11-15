import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SelectType from "../views/SelectType.vue";
import InitialRatings from "../views/InitialRatings.vue";
import Preferences from "../views/Preferences.vue";
import Recommendations from "../views/Recommendations.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: Home },
		{
			path: "/select-type",
			component: SelectType,
			meta: { requiresAuth: true },
		},
		{
			path: "/initial-ratings/:type",
			component: InitialRatings,
			meta: { requiresAuth: true },
			props: true, // This ensures the route params are passed as props
		},
		{
			path: "/preferences/:type",
			component: Preferences,
			meta: { requiresAuth: true },
		},
		{
			path: "/recommendations/:type",
			component: Recommendations,
			meta: { requiresAuth: true },
		},
	],
});

// Navigation guard
router.beforeEach((to, from, next) => {
	const user = localStorage.getItem("user");
	if (to.meta.requiresAuth && !user) {
		next("/");
	} else {
		next();
	}
});

export default router;
