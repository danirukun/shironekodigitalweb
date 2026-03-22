// @ts-check
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		sanity({
			projectId: 'm4iidr52',
			dataset: 'production',
			apiVersion: '2024-01-01',
			useCdn: false,
			studioBasePath: '/admin',
			// Hash router prerenders; browser history mode requires an SSR adapter for `/admin`.
			studioRouterHistory: 'hash',
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});