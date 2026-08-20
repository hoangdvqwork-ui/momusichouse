import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // false: no ISR/tag-based revalidation is set up yet, so a CDN cache
  // just meant published content (Hoàng publishing from Studio) didn't
  // show up on the live site promptly. Revisit if traffic/quota ever
  // makes this worth trading off against freshness.
  useCdn: false,
})
