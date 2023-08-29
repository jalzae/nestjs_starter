
import * as fs from 'fs';
import * as path from 'path';
const classRegex = /class\s+(\w+)\s*{/;

async function loadControllers(dir = '.') {
  const controllers: any[] = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const subControllers = loadControllers(filePath);
      controllers.push(...await subControllers);
    }

    if (file.endsWith('.controller.ts')) {
      const controllerFile = await fs.promises.readFile(dir + '/' + file, 'utf-8');
      const controller = controllerFile.match(classRegex)
      controllers.push(controller);
    }
  }

  return controllers;
}

const controllers = loadControllers(path.join(__dirname, './routes'));

export default controllers