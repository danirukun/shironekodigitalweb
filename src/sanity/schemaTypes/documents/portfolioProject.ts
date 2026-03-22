import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const portfolioProject = defineType({
	name: 'portfolioProject',
	title: 'Portfolio project',
	type: 'document',
	icon: DocumentIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'tags',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'projectUrl',
			type: 'url',
			title: 'Project URL',
			description: 'External link for the card CTA (optional)',
		}),
		defineField({
			name: 'order',
			type: 'number',
			description: 'Lower numbers appear first',
			initialValue: 0,
		}),
	],
	preview: {
		select: { title: 'title', media: 'image' },
		prepare({ title, media }) {
			return { title: title ?? 'Untitled', media };
		},
	},
});
