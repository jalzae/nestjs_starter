// generateIndex.ts
import * as fs from 'fs';
import * as path from 'path';

const directory = path.join(__dirname, '../app/model');

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const exports = files
    .filter((file) => file !== 'index.ts' && file.endsWith('.ts'))
    .map((file) => {
      const modelName = path.basename(file, '.ts');
      return `export { ${modelName} } from './${modelName}';`;
    });

  const indexFileContent = exports.join('\n');

  fs.writeFileSync(path.join(directory, 'index.ts'), indexFileContent);

  console.log('index.ts generated successfully.');
});
