const fs = require('fs');
const path = require('path');

// script to scan src/fonts and generate a CSS file with @font-face rules for
// every font file. Families are named after the file (without extension) so
// every variant is addressable independently. Run this before you build or
// during development when you add new font files.

const fontsDir = path.join(__dirname, '../src/fonts');
const outFile = path.join(__dirname, '../src/fonts.css');

if (!fs.existsSync(fontsDir)) {
  console.error('Fonts directory does not exist:', fontsDir);
  process.exit(1);
}

const files = fs.readdirSync(fontsDir).filter(f => /\.(woff2?|ttf|otf|eot)$/i.test(f));

let css = '/* Auto‑generated font‑face declarations */\n';
files.forEach(file => {
  const name = path.basename(file, path.extname(file));
  const ext = path.extname(file).slice(1).toLowerCase();
  // format mapping for css
  let format = ext;
  if (ext === 'ttf') format = 'truetype';
  if (ext === 'otf') format = 'opentype';
  css += `@font-face { font-family: '${name}'; src: url('./fonts/${file}') format('${format}'); font-weight: normal; font-style: normal; }\n`;
});

fs.writeFileSync(outFile, css);
console.log('Wrote', outFile, 'with', files.length, 'font entries');
