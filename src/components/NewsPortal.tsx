import React, { useState, useMemo, useEffect } from 'react';

interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  image: string;
  description: string;
  alt: string;
}

interface NewsPortalProps {
  lang?: "ca" | "es";
}

const articlesData: Record<"ca" | "es", Article[]> = {
  ca: [
    {
      id: 1,
      title: "Digitalització de l'Arxiu Industrial: Un viatge al passat",
      category: "Història",
      readTime: "5 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9zDROrGCOXeqariPC6ruo2OmNmidmXakBKUdrcDETBhMFUt5QRXsbYYRlz3YyGfqIW1z6mZcLpuhV6CdYv7jmHuGsVH06ynvFaY3nFunpkw7ikF01OjSqUePMktGNPDEiO27WrIN_0T1VIWk3RjnFA2q3Ff0BT3L61zNTR1guVJWez3QH-zn4jGXjHdvXgiFX7U3omTF0vV-2HyNeKPwzosycTpBBZB4WvNx6ZT5YC4JqLCCuGPBaNeqmJ3ta6436EIm247DRlIOI",
      description: "Iniciem el procés de preservació digital de més de 500 documents històrics de les antigues filatures de l'Eixample.",
      alt: "Arxiu Industrial digitalitzat"
    },
    {
      id: 2,
      title: "Assemblea de Veïns: Resultats del Pressupost Participatiu",
      category: "Activitats",
      readTime: "3 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfL24rhEpx0WjB2202ghb6AeITtxB6oLgjx7VvxNck-5EPrbSucmSYfH_qnEKWFRc8aUMu8wvU72xGIdPFaN3WQm8pqsnpg0dUmKo63cbnV1XZXklVTredby35m61kOu0ucndZjkt9qHSlRGKjb6fYmciBXAXsk-J0Jxq5N-wLuubr25GQG7JlxACwdQJc4jmgqGTAwcRYcP_AmLtmIX8W2x5ggZnLeEVuvFk2mx3rtVI1NgVKW6wUxHBHQY8IRGUguzwi1XZGCrNv",
      description: "Més de 200 veïns han votat per les millores del barri. El parc de la Filosa rebrà la inversió principal per a la nova àrea infantil.",
      alt: "Assemblea de veïns participativa"
    },
    {
      id: 3,
      title: "Cicle de Cinema a la Fresca: Programació d'Estiu",
      category: "Cultura",
      readTime: "2 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR1PrYMyEtPVj-zPmZkCDNCw3ZIRFI7ze8EB_8SzKCu1672QzKLjrj0zsBVwNOF1YuOn6VnBwsyR4vrdBuHqnJubrV0VofkSx1S_9tLHUfk9ioGx1NfPhS2QD5dqGME4yEcVfSaANAxICS-N6t1GDTo6LmEvS3KLufSvxMYcbdugwaRjo80SPqkyvC1O1sJ4SzFJK1JLnWeyYkIjNE5fgCfBO6wOadnIYhZC6WH4aUtVejlgX0Srjs7L8fdrtdT22TwMTIt3twTZzd",
      description: "Torna el cinema al pati de la fàbrica. Enguany, el cicle se centra en documentals sobre transformació urbana i art social.",
      alt: "Cine exterior estiu"
    },
    {
      id: 4,
      title: "Taller d'Innovació Social: Emprenent al Barri",
      category: "Activitats",
      readTime: "4 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGLgJTwjvJulWLu0iZuxJJBlkvRE9j4Ci2IuwGznxsCVkGyUDGJ1OJQYs682ediEGYGX61a6tw8aVh2F6gZREOMa-CT1ccNCOAyFpSjiuPtLHo1KgBCdlYqvLOtIl1URtn2jc3BEevBwnN2hR-d24tarBSmUH3UtG0rX1-ifyi5p-Z_xXO6TXNtjZPWDh-O8GnwaggIbT8lSRwKoNSZ7F0sjm-vZ2a3lL857lhTZXUCN3ThL6TGG7R3d14h0YO3_BAg1pys71ZYAqH",
      description: "Obrim les inscripcions per al nou taller d'emprenedoria local destinat a joves veïns de l'Eixample.",
      alt: "Taller innovació"
    },
    {
      id: 5,
      title: "Retrats de l'Eix: Testimonis de la Sabadell tèxtil",
      category: "Història",
      readTime: "6 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJrJHFZX1IeMjQ6Ny572w8BqWWCnks0TN0QnpDYWky7uB3i7CL4MoMlPTQVXi6xuBAWxfhNSJZyxDJVAc4a4jku02dsmv354gkMIL9LS_IQfhOvbLo9q6E_H4XQWDWUYigJwltwz_-DeuXq2a_6KwjDKRXW12MnZR50T-gxOGz1PkLM_DlGcWwUomnueuEXGyDYSENGm85Evao0oM5TXcqtSgLRhfpuux9jin3YwsnTMv_ZKKGkCzy-GiJhNUg2N-cS3IXcRYxxuwd",
      description: "Una nova exposició fotogràfica recull les històries dels antics treballadors i treballadores de les fàbriques del barri.",
      alt: "Artesà taller Sabadell"
    },
    {
      id: 6,
      title: "Nova il·luminació LED: Més seguretat i eficiència",
      category: "Urbanisme",
      readTime: "2 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChm6osAFnZ6kNrAs3-3LAzHMKlYcI65vpb458dqFVgOPyU-zSjOmmzGrpJIkBrfvhk0Oh_1WUqDzRPcWK6u8BE0KdD8V4PFpkdzoggjTwHCz8o2yzR17ENHIWEQF9XomdIV1H0wO5chOjHKKySdAj6jjgHzlsU35rM7EdwuNl9TOeye3_qAAqNQOoSEotFEfz3T6ngMN6v8hTaXaYuBtz8js7Q8EKjEP7buBHZ3Py5QXPe-NsT2mD2Q4EX4gxhi7O5omO0Rf-hYqhI",
      description: "S'ha completat la instal·lació dels nous fanals LED intel·ligents a tot el perímetre del barri, reduint el consum un 40%.",
      alt: "Parc urbà modernitzat"
    }
  ],
  es: [
    {
      id: 1,
      title: "Digitalización del Archivo Industrial: Un viaje al pasado",
      category: "Historia",
      readTime: "5 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9zDROrGCOXeqariPC6ruo2OmNmidmXakBKUdrcDETBhMFUt5QRXsbYYRlz3YyGfqIW1z6mZcLpuhV6CdYv7jmHuGsVH06ynvFaY3nFunpkw7ikF01OjSqUePMktGNPDEiO27WrIN_0T1VIWk3RjnFA2q3Ff0BT3L61zNTR1guVJWez3QH-zn4jGXjHdvXgiFX7U3omTF0vV-2HyNeKPwzosycTpBBZB4WvNx6ZT5YC4JqLCCuGPBaNeqmJ3ta6436EIm247DRlIOI",
      description: "Iniciamos el proceso de preservación digital de más de 500 documentos históricos de las antiguas hilaturas del Eixample.",
      alt: "Archivo Industrial digitalizado"
    },
    {
      id: 2,
      title: "Asamblea de Vecinos: Resultados del Presupuesto Participativo",
      category: "Actividades",
      readTime: "3 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfL24rhEpx0WjB2202ghb6AeITtxB6oLgjx7VvxNck-5EPrbSucmSYfH_qnEKWFRc8aUMu8wvU72xGIdPFaN3WQm8pqsnpg0dUmKo63cbnV1XZXklVTredby35m61kOu0ucndZjkt9qHSlRGKjb6fYmciBXAXsk-J0Jxq5N-wLuubr25GQG7JlxACwdQJc4jmgqGTAwcRYcP_AmLtmIX8W2x5ggZnLeEVuvFk2mx3rtVI1NgVKW6wUxHBHQY8IRGUguzwi1XZGCrNv",
      description: "Más de 200 vecinos han votado por las mejoras del barrio. El parque de la Filosa recibirá la inversión principal para la nueva área infantil.",
      alt: "Asamblea de vecinos participativa"
    },
    {
      id: 3,
      title: "Ciclo de Cine al Aire Libre: Programación de Verano",
      category: "Cultura",
      readTime: "2 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR1PrYMyEtPVj-zPmZkCDNCw3ZIRFI7ze8EB_8SzKCu1672QzKLjrj0zsBVwNOF1YuOn6VnBwsyR4vrdBuHqnJubrV0VofkSx1S_9tLHUfk9ioGx1NfPhS2QD5dqGME4yEcVfSaANAxICS-N6t1GDTo6LmEvS3KLufSvxMYcbdugwaRjo80SPqkyvC1O1sJ4SzFJK1JLnWeyYkIjNE5fgCfBO6wOadnIYhZC6WH4aUtVejlgX0Srjs7L8fdrtdT22TwMTIt3twTZzd",
      description: "Vuelve el cine al patio de la fábrica. Este año, el ciclo se centra en documentales sobre transformación urbana y arte social.",
      alt: "Cine exterior verano"
    },
    {
      id: 4,
      title: "Taller de Innovación Social: Emprendiendo en el Barrio",
      category: "Actividades",
      readTime: "4 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGLgJTwjvJulWLu0iZuxJJBlkvRE9j4Ci2IuwGznxsCVkGyUDGJ1OJQYs682ediEGYGX61a6tw8aVh2F6gZREOMa-CT1ccNCOAyFpSjiuPtLHo1KgBCdlYqvLOtIl1URtn2jc3BEevBwnN2hR-d24tarBSmUH3UtG0rX1-ifyi5p-Z_xXO6TXNtjZPWDh-O8GnwaggIbT8lSRwKoNSZ7F0sjm-vZ2a3lL857lhTZXUCN3ThL6TGG7R3d14h0YO3_BAg1pys71ZYAqH",
      description: "Abrimos las inscripciones para el nuevo taller de emprendimiento local destinado a jóvenes vecinos del Eixample.",
      alt: "Taller innovación"
    },
    {
      id: 5,
      title: "Retratos del Eix: Testimonios de la Sabadell textil",
      category: "Historia",
      readTime: "6 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJrJHFZX1IeMjQ6Ny572w8BqWWCnks0TN0QnpDYWky7uB3i7CL4MoMlPTQVXi6xuBAWxfhNSJZyxDJVAc4a4jku02dsmv354gkMIL9LS_IQfhOvbLo9q6E_H4XQWDWUYigJwltwz_-DeuXq2a_6KwjDKRXW12MnZR50T-gxOGz1PkLM_DlGcWwUomnueuEXGyDYSENGm85Evao0oM5TXcqtSgLRhfpuux9jin3YwsnTMv_ZKKGkCzy-GiJhNUg2N-cS3IXcRYxxuwd",
      description: "Una nueva exposición fotográfica recoge las historias de los antiguos trabajadores y trabajadoras de las fábricas del barrio.",
      alt: "Artesano taller Sabadell"
    },
    {
      id: 6,
      title: "Nueva iluminación LED: Más seguridad y eficiencia",
      category: "Urbanismo",
      readTime: "2 min de lectura",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChm6osAFnZ6kNrAs3-3LAzHMKlYcI65vpb458dqFVgOPyU-zSjOmmzGrpJIkBrfvhk0Oh_1WUqDzRPcWK6u8BE0KdD8V4PFpkdzoggjTwHCz8o2yzR17ENHIWEQF9XomdIV1H0wO5chOjHKKySdAj6jjgHzlsU35rM7EdwuNl9TOeye3_qAAqNQOoSEotFEfz3T6ngMN6v8hTaXaYuBtz8js7Q8EKjEP7buBHZ3Py5QXPe-NsT2mD2Q4EX4gxhi7O5omO0Rf-hYqhI",
      description: "Se ha completado la instalación de las nuevas farolas LED inteligentes en todo el perímetro del barrio, reduciendo el consumo un 40%.",
      alt: "Parque urbano modernizado"
    }
  ]
};

const categoriesData = {
  ca: ["Totes", "Cultura", "Urbanisme", "Història", "Activitats"],
  es: ["Todas", "Cultura", "Urbanismo", "Historia", "Actividades"]
};

export default function NewsPortal({ lang = "ca" }: NewsPortalProps) {
  const categories = categoriesData[lang];
  const articles = articlesData[lang];

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
      // Index-based match for categories to align between CA/ES
      const catIdx = categories.indexOf(selectedCategory);
      const matchesCategory = catIdx === 0 || article.category === articles[article.id - 1]?.category;
      
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, lang, categories, articles]);

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
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors tracking-tight">
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
