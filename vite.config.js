import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [vue()],
	build: {
		outDir: "dist",
	},
	server: {
		proxy: {
			"/api": {
				target: "https://your-backend-domain.com", // For dev, proxy backend
				changeOrigin: true,
			},
		},
	},
});
