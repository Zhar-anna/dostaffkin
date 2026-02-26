const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

// Read index.html template
const indexPath = path.join(__dirname, '../src/index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Replace placeholders with actual environment variables
const apiKey = process.env.YANDEX_MAPS_API_KEY;
const suggestApiKey = process.env.YANDEX_MAPS_SUGGEST_API_KEY;

if (!apiKey || !suggestApiKey) {
  console.warn('⚠️  Warning: Yandex Maps API keys not found in .env file');
  console.warn('Make sure .env file exists with YANDEX_MAPS_API_KEY and YANDEX_MAPS_SUGGEST_API_KEY');
}

// Replace placeholders in index.html
indexContent = indexContent.replace(
  /src="https:\/\/api-maps\.yandex\.ru\/2\.1\/\?lang=ru_RU&apikey=\${YANDEX_MAPS_API_KEY}&suggest_apikey=\${YANDEX_MAPS_SUGGEST_API_KEY}"/g,
  `src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}&suggest_apikey=${suggestApiKey}"`
);

// Write back to index.html
fs.writeFileSync(indexPath, indexContent, 'utf-8');

console.log('✓ Environment variables loaded successfully');
