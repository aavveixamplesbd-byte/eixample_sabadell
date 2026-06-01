import type { Article } from '../data/newsData';

// Dynamic helper to fetch CMS articles using import.meta.glob (standard in Vite/Astro)
export async function getArticles(): Promise<Article[]> {
  const mdFiles = import.meta.glob('../content/noticies/*.md', { eager: true });
  
  const cmsArticles: Article[] = Object.entries(mdFiles).map(([path, file]: [string, any], index) => {
    const fm = file.frontmatter;
    
    // Derive slug and default date from filename (e.g. 2026-06-01-slug-name.md)
    const filename = path.split('/').pop() || '';
    const cleanFilename = filename.replace(/\.md$/, '');
    
    const dateStr = cleanFilename.substring(0, 10);
    // Find the dash after the date
    const slugStr = cleanFilename.substring(11);
    
    return {
      id: 1000 + index, // unique ID
      title: {
        ca: fm.title_ca || '',
        es: fm.title_es || ''
      },
      category: {
        ca: fm.category_ca || 'Activitats',
        es: fm.category_es || 'Actividades'
      },
      date: fm.date || dateStr || new Date().toISOString().split('T')[0],
      readTime: {
        ca: fm.readTime_ca || '3 min de lectura',
        es: fm.readTime_es || '3 min de lectura'
      },
      image: fm.image || '/og-image.png',
      description: {
        ca: fm.description_ca || '',
        es: fm.description_es || ''
      },
      alt: {
        ca: fm.alt_ca || '',
        es: fm.alt_es || ''
      },
      slug: {
        ca: slugStr,
        es: slugStr
      },
      content: {
        ca: fm.body_ca ? fm.body_ca.split('\n\n') : [],
        es: fm.body_es ? fm.body_es.split('\n\n') : []
      },
      featured: fm.featured || false
    };
  });

  return cmsArticles;
}
