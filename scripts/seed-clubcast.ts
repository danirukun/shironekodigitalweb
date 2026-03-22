import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
	console.error('Missing SANITY_API_WRITE_TOKEN. Create a token with Editor permissions at sanity.io/manage.');
	process.exit(1);
}

const client = createClient({
	projectId: 'm4iidr52',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false,
	token,
});

const doc = {
	_type: 'portfolioProject' as const,
	_id: 'portfolioProject-clubcast',
	title: 'ClubCast.tv',
	slug: { _type: 'slug' as const, current: 'clubcast-tv' },
	description:
		"A comprehensive streaming and community platform designed for creators and their audiences. Built with scalability and real-time interaction at its core.",
	tags: ['Streaming', 'Web Platform', 'Community', 'Real-time'],
	order: 0,
};

await client.createOrReplace(doc);
console.log('Seeded portfolioProject-clubcast');
