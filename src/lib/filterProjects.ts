// Shared by FeaturedProjectsClient.tsx (/projects) and
// AllProjectsClient.tsx (/projects/all) -- same search+category logic,
// not duplicated between the two. Search matches the project name only
// (not category/year) -- category has its own dedicated filter, no
// need to double up.
export function filterProjects<T extends { name: string; category: string }>(
  projects: T[],
  search: string,
  category: string
): T[] {
  const q = search.trim().toLowerCase();
  return projects.filter((p) => {
    if (category && p.category !== category) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });
}
