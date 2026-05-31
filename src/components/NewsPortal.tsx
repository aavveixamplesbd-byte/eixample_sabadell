import React, { useState, useMemo, useEffect } from 'react';
import { newsArticles } from '../data/newsData';

interface NewsPortalProps {
  lang?: "ca" | "es";
}

const categoriesData = {
  ca: ["Totes", "Cultura", "Urbanisme", "Història", "Activitats"],
  es: ["Todas", "Cultura", "Urbanismo", "Historia", "Actividades"]
};

export default function NewsPortal({ lang = "ca" }: NewsPortalProps) {
  const categories = categoriesData[lang];

  // Map articles to the current language
  const articles = useMemo(() => {
    return [...newsArticles]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((art) => ({
        id: art.id,
        title: art.title[lang],
        category: art.category[lang],
        readTime: art.readTime[lang],
        image: art.image,
        description: art.description[lang],
        alt: art.alt[lang]
      }));
  }, [lang]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Reset selected category if language changes
  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [lang]);

  // Filter & Search Logic
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === categories[0] || article.category === selectedCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, articles, categories]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const t = {
    ca: {
      placeholder: "Cercar a l'arxiu...",
      noResults: "No s'han trobat notícies que coincideixin amb la cerca."
    },
    es: {
      placeholder: "Buscar en el archivo...",
      noResults: "No se han encontrado noticias que coincidan con la búsqueda."
    }
  }[lang];

  return (
    <div>
      {/* Search and Filters Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-outline-variant/20">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-primary/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            type="text"
            placeholder={t.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-label-md font-label-md w-full md:w-64 transition-all"
          />
        </div>
      </section>

      {/* Article Grid */}
      {paginatedArticles.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedArticles.map((article) => (
            <article key={article.id} className="flex flex-col group cursor-pointer">
              <div className="aspect-[4/3] mb-6 overflow-hidden rounded-2xl border border-outline-variant">
                <img
                  alt={article.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={article.image}
                />
              </div>
              <div className="px-2">
                <span className="font-label-sm text-label-sm text-primary mb-3 block font-extrabold uppercase tracking-[0.1em]">
                  {article.category}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body-md text-on-surface-variant line-clamp-3 mb-4">
                  {article.description}
                </p>
                <div className="text-outline font-label-sm text-label-sm flex items-center gap-2 mt-auto">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>schedule</span>
                  {article.readTime}
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/20">
          <span className="material-symbols-outlined text-outline text-5xl mb-4">find_in_page</span>
          <p className="font-body-lg text-on-surface-variant">{t.noResults}</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 disabled:hover:bg-transparent transition-all"
            aria-label="Pàgina anterior"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-label-md ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 disabled:hover:bg-transparent transition-all"
            aria-label="Pàgina següent"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
}
