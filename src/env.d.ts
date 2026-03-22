/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare module '*.svg?raw' {
	const content: string;
	export default content;
}
