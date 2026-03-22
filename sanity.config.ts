import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
	name: 'default',
	title: 'Shironeko Digital',
	projectId: 'm4iidr52',
	dataset: 'production',
	plugins: [structureTool()],
	schema: {
		types: schemaTypes,
	},
});
