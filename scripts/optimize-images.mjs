#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public');

// Configuration d'optimisation
const config = {
  // Images très lourdes (> 500KB) -> qualité 75
  heavy: { quality: 75, maxWidth: 1200 },
  // Images moyennes (100-500KB) -> qualité 80
  medium: { quality: 80, maxWidth: 800 },
  // Petites images (< 100KB) -> qualité 85
  light: { quality: 85, maxWidth: 600 }
};

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath, ext);
  const size = await getFileSize(filePath);
  const sizeKB = size / 1024;

  console.log(`📸 Traitement: ${basename(filePath)} (${sizeKB.toFixed(0)}KB)`);

  // Choisir la configuration selon la taille
  let opts;
  if (sizeKB > 500) {
    opts = config.heavy;
    console.log(`   → Image lourde détectée, qualité ${opts.quality}%`);
  } else if (sizeKB > 100) {
    opts = config.medium;
    console.log(`   → Image moyenne, qualité ${opts.quality}%`);
  } else {
    opts = config.light;
    console.log(`   → Petite image, qualité ${opts.quality}%`);
  }

  const outputDir = dirname(filePath);

  try {
    // Charger l'image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Redimensionner si nécessaire
    let resized = image;
    if (metadata.width > opts.maxWidth) {
      resized = image.resize(opts.maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
      console.log(`   → Redimensionné de ${metadata.width}px à ${opts.maxWidth}px`);
    }

    // Convertir en WebP
    const webpPath = join(outputDir, `${name}.webp`);
    await resized
      .webp({ quality: opts.quality, effort: 6 })
      .toFile(webpPath);

    const webpSize = await getFileSize(webpPath);
    const webpSizeKB = webpSize / 1024;
    const savings = ((size - webpSize) / size * 100).toFixed(1);

    console.log(`   ✅ WebP créé: ${basename(webpPath)} (${webpSizeKB.toFixed(0)}KB, -${savings}%)`);

    // Aussi optimiser l'original (JPEG/PNG)
    if (ext === '.jpg' || ext === '.jpeg') {
      const jpegPath = join(outputDir, `${name}-optimized.jpg`);
      await resized
        .jpeg({ quality: opts.quality, mozjpeg: true })
        .toFile(jpegPath);

      const jpegSize = await getFileSize(jpegPath);
      const jpegSizeKB = jpegSize / 1024;
      console.log(`   ✅ JPEG optimisé: ${basename(jpegPath)} (${jpegSizeKB.toFixed(0)}KB)`);
    } else if (ext === '.png') {
      const pngPath = join(outputDir, `${name}-optimized.png`);
      await resized
        .png({ quality: opts.quality, compressionLevel: 9 })
        .toFile(pngPath);

      const pngSize = await getFileSize(pngPath);
      const pngSizeKB = pngSize / 1024;
      console.log(`   ✅ PNG optimisé: ${basename(pngPath)} (${pngSizeKB.toFixed(0)}KB)`);
    }

  } catch (error) {
    console.error(`   ❌ Erreur: ${error.message}`);
  }
}

async function findImages(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  const imageExtensions = ['.jpg', '.jpeg', '.png'];

  for (const file of files) {
    const fullPath = join(dir, file.name);

    if (file.isDirectory()) {
      await findImages(fullPath);
    } else if (imageExtensions.includes(extname(file.name).toLowerCase())) {
      // Ignorer les fichiers déjà optimisés
      if (!file.name.includes('-optimized')) {
        await optimizeImage(fullPath);
      }
    }
  }
}

console.log('🚀 Optimisation des images...\n');
await findImages(publicDir);
console.log('\n✨ Optimisation terminée !');
console.log('\n📝 Prochaines étapes:');
console.log('   1. Vérifiez les images *-optimized.* et *.webp générées');
console.log('   2. Si satisfait, remplacez les originaux par les versions optimisées');
console.log('   3. Utilisez <Image> de Next.js pour supporter WebP automatiquement');
