import { createClient } from '@supabase/supabase-js';
import type { Article } from '../data/newsData';

const supabaseUrl = import.meta.env.SUPABASE_URL || (typeof process !== 'undefined' ? process.env.SUPABASE_URL : '') || '';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.SUPABASE_ANON_KEY : '') || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getArticles(): Promise<Article[]> {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials missing. Returning empty news articles list.');
    return [];
  }
  
  const { data, error } = await supabase
    .from('noticies')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching articles from Supabase:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    title: {
      ca: row.title_ca || '',
      es: row.title_es || ''
    },
    category: {
      ca: row.category_ca || 'Activitats',
      es: row.category_es || 'Actividades'
    },
    date: row.date || '',
    readTime: {
      ca: row.readTime_ca || '4 min de lectura',
      es: row.readTime_es || '4 min de lectura'
    },
    image: row.image || '/og-image.png',
    description: {
      ca: row.description_ca || '',
      es: row.description_es || ''
    },
    alt: {
      ca: row.alt_ca || '',
      es: row.alt_es || ''
    },
    slug: {
      ca: row.slug_ca || '',
      es: row.slug_es || ''
    },
    content: {
      ca: Array.isArray(row.content_ca) ? row.content_ca : (row.content_ca ? row.content_ca.split('\n\n') : []),
      es: Array.isArray(row.content_es) ? row.content_es : (row.content_es ? row.content_es.split('\n\n') : [])
    },
    featured: !!row.featured
  }));
}
