"use client";

// Shared search + category filter nav bar, 2026-08-24 -- used on both
// /projects (featured, FocusGallery) and /projects/all (full library,
// plain grid). Controlled component: the parent owns search/category
// state and does the actual filtering (filterProjects.ts), this is
// just the input UI.
export default function ProjectFilterBar({
  categories,
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: {
  categories: string[];
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search projects..."
        className="flex-1 bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="bg-black border border-white/30 px-3 py-2 text-white focus:border-accent outline-none sm:w-64"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
