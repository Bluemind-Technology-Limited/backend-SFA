// this generates a static swagger.json file at build time
// this avoids swagger-jsdoc's runtime file globbing, which fails on serverless
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from '../src/config/swagger.js';

// this is the backend root directory (one level up from the scripts folder)
const scriptDir = dirname(fileURLToPath(import.meta.url));
const backendDir = join(scriptDir, '..');

// this generates the spec using the same options as the runtime config
const spec = swaggerJsdoc(swaggerOptions);

// this writes the spec to a static JSON file in the src directory
const outputPath = join(backendDir, 'src', 'swagger.json');
writeFileSync(outputPath, JSON.stringify(spec, null, 2));

console.log(`Swagger spec generated at ${outputPath}`);
console.log(`  Paths: ${Object.keys(spec.paths ?? {}).length}`);
console.log(`  Schemas: ${Object.keys(spec.components?.schemas ?? {}).length}`);
