/**
 * fix-vercel-runtime.js
 * 
 * Corrige el runtime de las Serverless Functions generadas por @astrojs/vercel v7.x.
 * La versión 7.x del adaptador genera "nodejs18.x" de forma hardcodeada,
 * pero Node 18 ya no es soportado por Vercel. Este script lo parchea a "nodejs20.x".
 */
import fs from 'fs';
import path from 'path';

const vcConfigPath = path.resolve('.vercel/output/functions/_render.func/.vc-config.json');

if (fs.existsSync(vcConfigPath)) {
  const config = JSON.parse(fs.readFileSync(vcConfigPath, 'utf8'));
  
  if (config.runtime && config.runtime === 'nodejs18.x') {
    config.runtime = 'nodejs20.x';
    fs.writeFileSync(vcConfigPath, JSON.stringify(config, null, '\t'));
    console.log('✅ [fix-vercel-runtime] Corregido runtime de nodejs18.x → nodejs20.x');
  } else {
    console.log(`ℹ️  [fix-vercel-runtime] Runtime ya es "${config.runtime}", no se necesita corrección.`);
  }
} else {
  console.log('ℹ️  [fix-vercel-runtime] No se encontró .vc-config.json (build estático, no aplica).');
}
