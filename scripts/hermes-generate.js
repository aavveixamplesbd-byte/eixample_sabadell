import fs from 'fs';
import path from 'path';

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

// Variables universales
const AI_API_KEY = process.env.AI_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.GEMINI_API_KEY;
const AI_API_URL = process.env.AI_API_URL || (process.env.DEEPSEEK_API_KEY ? "https://api.deepseek.com/v1" : "");
const AI_MODEL = process.env.AI_MODEL || (process.env.DEEPSEEK_API_KEY ? "deepseek-chat" : "gemini-2.5-flash");
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

// Supabase (Opcional - para publicación en base de datos en vivo)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Vercel (Opcional - para disparar redespliegue automático)
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

if (!AI_API_KEY) {
  console.error("ERROR: Debes configurar AI_API_KEY (o DEEPSEEK_API_KEY / GEMINI_API_KEY).");
  process.exit(1);
}
if (!TAVILY_API_KEY) {
  console.error("ERROR: TAVILY_API_KEY no configurado.");
  process.exit(1);
}

// Configuración del barrio
const NEIGHBORHOOD_CONTEXT = {
  name: "Eixample Sabadell",
  city: "Sabadell",
  streets: ["Avinguda de Barberà (artèria principal i eix comercial)", "Gran Via (límit)", "Carretera de Barcelona (límit)", "Carrer de Brutau", "Carrer de Calders"],
  places: ["Parc de la Filosa", "Pati de l'antiga fàbrica tèxtil", "Casal del Barri"],
  identity: "Barri de passat tèxtil i obrer de finals del segle XIX i principis del segle XX. Molt lligat a les antigues indústries de filatura de Sabadell. La junta oficial de veïns és l'AAVV de l'Eixample de Sabadell (AVES)."
};

// Temas y queries correspondientes por día
const THEMES = {
  1: {
    category: "Urbanisme",
    prompt: "Notícies sobre mobilitat, pacificació de carrers, obres o infraestructures al barri, especialment al voltant de l'Avinguda de Barberà o els límits de Gran Via i Carretera de Barcelona.",
    query: "obres avinguda barbera sabadell"
  },
  2: {
    category: "Consells i Salut",
    prompt: "Consells de salut per al dia a dia dels veïns, per exemple, al·lèrgies primaverals per plàtans d'ombra a l'Avinguda de Barberà o els carrers Brutau i Calders, estalvi d'energia, clima o reciclatge.",
    query: "alergia platans ombra sabadell consells salut"
  },
  3: {
    category: "Història",
    prompt: "Cròniques sobre el passat tèxtil, memòria obrera, les antigues xemeneies, el carrer Brutau o Calders, o la fàbrica de la Filosa del barri.",
    query: "historia eixample sabadell fabriques"
  },
  4: {
    category: "Activitats",
    prompt: "Agenda d'activitats de proximitat, assemblees de veïns de l'AVES, cicle de cinema a la fresca o propostes culturals per al cap de setmana al barri.",
    query: "agenda cultural sabadell activitats de proximitat"
  },
  5: {
    category: "Comerç",
    prompt: "Reportatges sobre comerços locals del barri, botigues històriques a l'Avinguda de Barberà, emprenedors o cooperatives de l'Eixample.",
    query: "comerc local avinguda barbera sabadell"
  }
};

const today = new Date();
let dayOfWeek = today.getDay();
if (dayOfWeek === 0 || dayOfWeek === 6) {
  dayOfWeek = Math.floor(Math.random() * 5) + 1;
}

const activeTheme = THEMES[dayOfWeek] || THEMES[1];
console.log(`Hoy toca tema: ${activeTheme.category}. Buscando en Tavily...`);

async function run() {
  try {
    // 1. Llamar a Tavily
    const tavilyResponse = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: `${activeTheme.query} Sabadell`,
        include_images: true,
        search_depth: "advanced"
      })
    });

    if (!tavilyResponse.ok) {
      throw new Error(`Error en Tavily: ${tavilyResponse.statusText}`);
    }

    const tavilyData = await tavilyResponse.json();
    console.log("Resultados de Tavily recibidos correctamente.");

    let imageUrl = "";
    if (tavilyData.images && tavilyData.images.length > 0) {
      const validImages = tavilyData.images.filter(img => img.startsWith("http") && !img.includes(".svg"));
      if (validImages.length > 0) {
        imageUrl = validImages[0];
        console.log(`Imagen seleccionada de Tavily: ${imageUrl}`);
      }
    }

    if (!imageUrl) {
      const unsplashFallbacks = {
        "Urbanisme": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
        "Consells i Salut": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
        "Història": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        "Activitats": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        "Comerç": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      };
      imageUrl = unsplashFallbacks[activeTheme.category] || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80";
      console.log(`Imagen de fallback seleccionada: ${imageUrl}`);
    }

    // 2. Preparar prompts
    const systemInstruction = `Ets en Hermes, un redactor de notícies local, molt proper i de total confiança, per a l'AAVV de l'Eixample de Sabadell (AVES). 
El teu públic objectiu són els veïns i veïnes del barri. El barri és petit i molt de proximitat, així que la notícia ha d'estar redactada obligatòriament des de la mirada d'un veí del barri, fent esment a llocs reals i afectacions del dia a dia del nostre entorn immediat.

Context del barri:
- Nom del barri: Eixample Sabadell
- Carrers principals: ${NEIGHBORHOOD_CONTEXT.streets.join(", ")}
- Espais veïnals: ${NEIGHBORHOOD_CONTEXT.places.join(", ")}
- Identitat: ${NEIGHBORHOOD_CONTEXT.identity}

NORMES CRÍTIQUES DE REDACCIÓ:
- Sota cap concepte utilitzis el terme "Eixample Industrial". El barri s'ha d'anomenar sempre "Eixample Sabadell" o "l'Eixample".
- L'associació de veïns s'ha d'anomenar sempre "AAVV de l'Eixample de Sabadell" o "AVES", mai de "l'Eixample Industrial".
- CONTROL DE DADES REALS (NO ALUCINAR): Basa't ÚNICAMENT en la informació real aportada pels resultats de cerca d'internet. No t'inventis dates de concerts, adreces web, noms de persones o detalls que no apareguin de manera explícita en els resultats obtinguts. Si un detall no es troba en els resultats, no l'especifiquis o parla'n de forma genèrica.
- DISTINCIÓ D'ORGANITZACIÓ: Distingeix clarament entre el que organitza directament l'AVES (com les assemblees pròpies, cinema a la fresca del barri o tallers veïnals) i el que organitzen altres entitats o l'Ajuntament de Sabadell (com l'agenda general dels teatres municipals, l'Estruch, la Faràndula o el Casal Pere Quart). L'AVES no organitza aquests últims, sinó que es limita a recomanar-los i fer-ne difusió com a opcions d'interès per al veïnat.

Has de generar una notícia que combini de forma coherent la teva línia temática del dia juntament amb les notícies o context de proximitat que hem recuperat d'internet.
Tema d'avui (${activeTheme.category}): ${activeTheme.prompt}

Instruccions de format:
- Has de respondre en format JSON estricte (sense markdown de codi \`\`\`json i sense textos addicionals) que contingui les traduccions de la notícia a dos idiomes: Català ("ca") i Castellà ("es").
- L'esquema del JSON ha de ser:
  {
    "title": { "ca": "Títol en Català", "es": "Título en Castellano" },
    "category": { "ca": "Categoria en Català", "es": "Categoría en Castellano" },
    "readTime": { "ca": "X min de lectura", "es": "X min de lectura" },
    "description": { "ca": "Descripció curta en Català", "es": "Descripción corta en Castellano" },
    "alt": { "ca": "Descripció de la imatge", "es": "Descripción de la imagen" },
    "content": {
      "ca": ["Paràgraf 1...", "Paràgraf 2...", "Paràgraf 3..."],
      "es": ["Párrafo 1...", "Párrafo 2...", "Párrafo 3..."]
    }
  }
- El text del contingut ("content") ha de tener com a mínim 3 paràgrafs.
- El contingut en català i en castellà ha de ser equivalent.
- No incloguis títols com "Notícia del dia" o similars de farciment. Fes-lo periodístic, proper, cívic i amè.`;

    const searchContext = tavilyData.results.map(r => `Títol: ${r.title}\nContingut: ${r.content}\nURL: ${r.url}`).join("\n\n");
    const userPrompt = `Utilitzant la informació real obtinguda d'internet per a la teva redacció:\n\n${searchContext}\n\nSi us plau, redacta la notícia d'avui basant-te exclusivament en els fets reals anteriors. Recorda utilitzar la geolocalització del barri per connectar els fets generals amb els carrers i entorns del nostre barri.`;

    let generatedArticle;
    
    // Determinar si usamos el protocolo universal OpenAI (si AI_API_URL está definida) o el de Gemini
    const isGeminiDefault = !AI_API_URL && AI_MODEL.startsWith("gemini");

    if (!isGeminiDefault) {
      // Flujo Universal compatible con OpenAI / DeepSeek / OpenRouter / Together AI / Ollama
      const endpoint = `${AI_API_URL.replace(/\/$/, '')}/chat/completions`;
      console.log(`Usando proveedor universal OpenAI en: ${endpoint} (Modelo: ${AI_MODEL})`);
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AI_API_KEY}`
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error en Proveedor de IA Universal (${response.status}): ${errText}`);
      }

      const resData = await response.json();
      const contentText = resData.choices[0].message.content.trim();
      generatedArticle = JSON.parse(contentText);
    } else {
      // Flujo específico para Google Gemini API
      console.log(`Usando proveedor Gemini API (Modelo: ${AI_MODEL})`);
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${AI_API_KEY}`;
      
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: userPrompt }] }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error en Gemini API (${response.status}): ${errText}`);
      }

      const resData = await response.json();
      const contentText = resData.candidates[0].content.parts[0].text.trim();
      generatedArticle = JSON.parse(contentText);
    }

    console.log("Noticia generada correctamente por la Inteligencia Artificial.");

    // 3. Postprocesamiento de la noticia (Slugs, fecha, id, imagen)
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

    const finalArticle = {
      id: 0,
      title: generatedArticle.title,
      category: generatedArticle.category,
      date: new Date().toISOString().split('T')[0],
      readTime: generatedArticle.readTime,
      image: imageUrl,
      description: generatedArticle.description,
      alt: generatedArticle.alt,
      slug: {
        ca: generateSlug(generatedArticle.title.ca),
        es: generateSlug(generatedArticle.title.es)
      },
      content: generatedArticle.content
    };

    // 4. Modificar newsData.ts
    const newsDataFilePath = path.resolve(process.cwd(), 'src/data/newsData.ts');
    if (!fs.existsSync(newsDataFilePath)) {
      throw new Error(`No se encuentra el archivo: ${newsDataFilePath}`);
    }

    let fileContent = fs.readFileSync(newsDataFilePath, 'utf8');

    const idRegex = /id:\s*(\d+)/g;
    let match;
    let maxId = 0;
    while ((match = idRegex.exec(fileContent)) !== null) {
      const currentId = parseInt(match[1], 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    finalArticle.id = maxId + 1;
    console.log(`ID asignado para local: ${finalArticle.id}`);

    const arrayStartMarker = "export const newsArticles: Article[] = [";
    const markerIndex = fileContent.indexOf(arrayStartMarker);

    if (markerIndex === -1) {
      throw new Error("No se pudo encontrar el marcador del array de noticias en newsData.ts");
    }

    const insertPosition = markerIndex + arrayStartMarker.length;
    
    const articleString = `\n  {\n    id: ${finalArticle.id},\n    title: {\n      ca: "${finalArticle.title.ca.replace(/"/g, '\\"')}",\n      es: "${finalArticle.title.es.replace(/"/g, '\\"')}"\n    },\n    category: {\n      ca: "${finalArticle.category.ca}",\n      es: "${finalArticle.category.es}"\n    },\n    date: "${finalArticle.date}",\n    readTime: {\n      ca: "${finalArticle.readTime.ca}",\n      es: "${finalArticle.readTime.es}"\n    },\n    image: "${finalArticle.image}",\n    description: {\n      ca: "${finalArticle.description.ca.replace(/"/g, '\\"')}",\n      es: "${finalArticle.description.es.replace(/"/g, '\\"')}"\n    },\n    alt: {\n      ca: "${finalArticle.alt.ca.replace(/"/g, '\\"')}",\n      es: "${finalArticle.alt.es.replace(/"/g, '\\"')}"\n    },\n    slug: {\n      ca: "${finalArticle.slug.ca}",\n      es: "${finalArticle.slug.es}"\n    },\n    content: {\n      ca: [\n        ${finalArticle.content.ca.map(p => `"${p.replace(/"/g, '\\"')}"`).join(',\n        ')}\n      ],\n      es: [\n        ${finalArticle.content.es.map(p => `"${p.replace(/"/g, '\\"')}"`).join(',\n        ')}\n      ]\n    }\n  },`;

    const newFileContent = fileContent.slice(0, insertPosition) + articleString + fileContent.slice(insertPosition);
    fs.writeFileSync(newsDataFilePath, newFileContent, 'utf8');
    console.log("NOTICIA AÑADIDA CON ÉXITO A newsData.ts");

    // 5. PUBLICACIÓN OPCIONAL EN SUPABASE (EN VIVO)
    let publishedToSupabase = false;
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      console.log("Detectadas credenciales de Supabase. Intentando publicar en base de datos en vivo...");
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
        console.warn(`[Supabase Warning] No se pudo insertar directamente en Supabase: ${errText}`);
      } else {
        console.log("✅ NOTICIA PUBLICADA CON ÉXITO EN LA BASE DE DATOS DE SUPABASE!");
        publishedToSupabase = true;
      }
    } else {
      console.log("Supabase no configurado. La noticia solo se guardará localmente en Git.");
    }

    // 6. ACTIVAR WEBHOOK DE REDESPLIEGUE EN VERCEL (SI APLICA)
    if (publishedToSupabase && VERCEL_DEPLOY_HOOK) {
      console.log("Disparando webhook de redespliegue en Vercel...");
      const vercelResponse = await fetch(VERCEL_DEPLOY_HOOK, {
        method: "POST"
      });
      if (vercelResponse.ok) {
        console.log("✅ REDESPLIEGUE EN VERCEL SOLICITADO CORRECTAMENTE!");
      } else {
        console.warn(`[Vercel Warning] No se pudo disparar el redespliegue: ${vercelResponse.statusText}`);
      }
    }

    console.log(`Título CA: ${finalArticle.title.ca}`);
    console.log(`Título ES: ${finalArticle.title.es}`);
  } catch (error) {
    console.error("Error durante la generación de Hermes:", error);
    process.exit(1);
  }
}

run();
