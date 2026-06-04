import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Cargar variables de entorno locales de .env si existe
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value.trim();
    }
  });
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/·/g, '-')
    .replace(/ç/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
};

async function main() {
  console.log("=== CREADOR MANUAL DE NOTICIES (eixample_industrial_sabadell) ===");
  console.log("Aquest script afegirà una notícia directament a Supabase\n");

  const titleCa = await askQuestion("Títol de la notícia (CA): ");
  const titleEs = await askQuestion("Título de la noticia (ES): ");
  
  const categoryCa = await askQuestion("Categoria (CA) [ex: Urbanisme, Història, Activitats]: ");
  const categoryEs = await askQuestion("Categoría (ES) [ex: Urbanismo, Historia, Actividades]: ");

  const descriptionCa = await askQuestion("Descripció curta (CA): ");
  const descriptionEs = await askQuestion("Descripción corta (ES): ");

  const readTimeMin = await askQuestion("Temps de lectura estimat (en minuts): ");
  const readTimeCa = `${readTimeMin} min de lectura`;
  const readTimeEs = `${readTimeMin} min de lectura`;

  const image = await askQuestion("URL de la imatge de portada (deixa buit per defecte): ");
  const finalImage = image.trim() || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80";

  const altCa = await askQuestion("Alt de la imatge de portada (CA): ");
  const altEs = await askQuestion("Alt de la imagen de portada (ES): ");

  console.log("\nCos de la notícia (CA) - Introdueix el text. Separa paràgrafs amb un doble salt de línia. En acabar, premeu ENTER i després escriviu '\\end' a una línia nova:");
  let contentCaLines = [];
  while (true) {
    const line = await askQuestion("");
    if (line.trim() === "\\end") break;
    contentCaLines.push(line);
  }
  const contentCaStr = contentCaLines.join("\n").trim();
  const contentCaArray = contentCaStr.split(/\n\s*\n/).filter(p => p.trim() !== "");

  console.log("\nCuerpo de la noticia (ES) - Introduce el texto. Separa párrafos con doble salto de línea. Al acabar, pulsa ENTER y escribe '\\end' en una línea nueva:");
  let contentEsLines = [];
  while (true) {
    const line = await askQuestion("");
    if (line.trim() === "\\end") break;
    contentEsLines.push(line);
  }
  const contentEsStr = contentEsLines.join("\n").trim();
  const contentEsArray = contentEsStr.split(/\n\s*\n/).filter(p => p.trim() !== "");

  rl.close();

  const finalArticle = {
    title: { ca: titleCa, es: titleEs },
    category: { ca: categoryCa, es: categoryEs },
    date: new Date().toISOString().split('T')[0],
    readTime: { ca: readTimeCa, es: readTimeEs },
    image: finalImage,
    description: { ca: descriptionCa, es: descriptionEs },
    alt: { ca: altCa, es: altEs },
    slug: {
      ca: generateSlug(titleCa),
      es: generateSlug(titleEs)
    },
    content: {
      ca: contentCaArray,
      es: contentEsArray
    }
  };

  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase URL o Anon/Service Key no configurados en .env");
    }

    console.log("Publicant en Supabase...");
    const supabaseRestEndpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/noticies`;
    
    const payload = {
      title_ca: finalArticle.title.ca,
      title_es: finalArticle.title.es,
      category_ca: finalArticle.category.ca,
      category_es: finalArticle.category.es,
      date: finalArticle.date,
      readtime_ca: finalArticle.readTime.ca,
      readtime_es: finalArticle.readTime.es,
      image: finalArticle.image,
      alt_ca: finalArticle.alt.ca,
      alt_es: finalArticle.alt.es,
      slug_ca: finalArticle.slug.ca,
      slug_es: finalArticle.slug.es,
      description_ca: finalArticle.description.ca,
      description_es: finalArticle.description.es,
      content_ca: finalArticle.content.ca.join("\n\n"),
      content_es: finalArticle.content.es.join("\n\n"),
      featured: false
    };

    const supabaseResponse = await fetch(supabaseRestEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    if (!supabaseResponse.ok) {
      const errText = await supabaseResponse.text();
      throw new Error(`[Supabase Error]: ${errText}`);
    }

    console.log(`\n✅ NOTÍCIA INTEGRADA AMB ÈXIT EN SUPABASE!`);

    if (VERCEL_DEPLOY_HOOK) {
      console.log("Disparant webhook de redespliegue en Vercel...");
      const vercelResponse = await fetch(VERCEL_DEPLOY_HOOK, { method: "POST" });
      if (vercelResponse.ok) {
        console.log("✅ REDESPLIEGUE EN VERCEL SOLICITADO CORRECTAMENTE!");
      }
    }
  } catch (error) {
    console.error("❌ Error en desar la notícia:", error.message);
  }
}

main();
