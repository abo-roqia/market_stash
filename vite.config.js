import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "./src/assets"),
			components: path.resolve(__dirname, "./src/components"),
			constants: path.resolve(__dirname, "./src/constants"),
			context: path.resolve(__dirname, "./src/context"),
			layout: path.resolve(__dirname, "./src/layout"),
			utilities: path.resolve(__dirname, "./src/utilities"),
			widgets: path.resolve(__dirname, "./src/widgets"),
		},
	},
});
