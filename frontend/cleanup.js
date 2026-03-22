const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname);

const filesToDelete = [
  'src/components/BackgroundEffects.jsx',
  'src/components/CircularText.jsx',
  'src/components/HorizontalGallery.jsx',
  'src/components/LogoLoop.jsx',
  'src/components/MagneticButton.jsx',
  'src/components/ParallaxShowcase.jsx',
  'src/components/ScrollProgress.jsx',
  'src/components/ScrollThemeMorph.jsx',
  'src/components/SectionBackground.jsx',
  'src/components/SectionHeading.jsx',
  'src/components/SkillsAccordion.jsx',
  'src/components/StaggeredText.jsx',
  'src/components/ThemeStateIndicator.jsx',
  'src/components/ThemeWipe.jsx',
  'src/components/ThemedSection.jsx',
  'src/utils/animationConstants.js',
  'src/utils/gsapConfig.js',
  'src/utils/motionVariants.js',
  'src/utils/dynamic.jsx',
];

let deleted = 0;
let skipped = 0;

filesToDelete.forEach((relativePath) => {
  const fullPath = path.join(BASE, relativePath);
  try {
    fs.unlinkSync(fullPath);
    console.log('Deleted:', relativePath);
    deleted++;
  } catch (e) {
    console.log('Skipped (not found):', relativePath, '-', e.code);
    skipped++;
  }
});

console.log(`\nDone. Deleted: ${deleted}, Skipped: ${skipped}`);
