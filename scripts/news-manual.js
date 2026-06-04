import fs from 'fs';
import path from 'path';
import readline from 'readline';

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
  console.log("Aquest script afegirà una notícia directament a src/data/newsData.ts\n");

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
    id: 0,
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
    const newsDataFilePath = path.resolve(process.cwd(), 'src/data/newsData.ts');
    if (!fs.existsSync(newsDataFilePath)) {
      throw new Error(`No es troba el fitxer: ${newsDataFilePath}`);
    }

    let fileContent = fs.readFileSync(newsDataFilePath, 'utf8');

    // Trobar el ID màxim
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

    const arrayStartMarker = "export const newsArticles: Article[] = [";
    const markerIndex = fileContent.indexOf(arrayStartMarker);

    if (markerIndex === -1) {
      throw new Error("No s'ha pogut trobar el marcador de l'array de notícies a newsData.ts");
    }

    const insertPosition = markerIndex + arrayStartMarker.length;
    
    const articleString = `\n  {\n    id: ${finalArticle.id},\n    title: {\n      ca: "${finalArticle.title.ca.replace(/"/g, '\\"')}",\n      es: "${finalArticle.title.es.replace(/"/g, '\\"')}"\n    },\n    category: {\n      ca: "${finalArticle.category.ca}",\n      es: "${finalArticle.category.es}"\n    },\n    date: "${finalArticle.date}",\n    readTime: {\n      ca: "${finalArticle.readTime.ca}",\n      es: "${finalArticle.readTime.es}"\n    },\n    image: "${finalArticle.image}",\n    description: {\n      ca: "${finalArticle.description.ca.replace(/"/g, '\\"')}",\n      es: "${finalArticle.description.es.replace(/"/g, '\\"')}"\n    },\n    alt: {\n      ca: "${finalArticle.alt.ca.replace(/"/g, '\\"')}",\n      es: "${finalArticle.alt.es.replace(/"/g, '\\"')}"\n    },\n    slug: {\n      ca: "${finalArticle.slug.ca}",\n      es: "${finalArticle.slug.es}"\n    },\n    content: {\n      ca: [\n        ${finalArticle.content.ca.map(p => `"${p.replace(/"/g, '\\"')}"`).join(',\n        ')}\n      ],\n      es: [\n        ${finalArticle.content.es.map(p => `"${p.replace(/"/g, '\\"')}"`).join(',\n        ')}\n      ]\n    }\n  },`;

    const newFileContent = fileContent.slice(0, insertPosition) + articleString + fileContent.slice(insertPosition);
    fs.writeFileSync(newsDataFilePath, newFileContent, 'utf8');

    console.log(`\n✅ NOTÍCIA INTEGRADA AMB ÈXIT (ID: ${finalArticle.id})!`);
  } catch (error) {
    console.error("❌ Error en desar la notícia:", error);
  }
}

main();
