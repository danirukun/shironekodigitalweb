import { defineQuery } from 'groq';

export const portfolioProjectsQuery = defineQuery(`
  *[_type == "portfolioProject" && defined(slug.current)] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    projectUrl,
    image
  }
`);
