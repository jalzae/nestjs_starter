import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ControllerLoader {
  loadControllers(directory: string): any[] {
    const controllers: any[] = [];
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && file.endsWith('.controller.ts')) {
        const imported = require(filePath);
        const controllerClass = Object.values(imported).find(
          (exported) => exported && exported.constructor.name.endsWith('Controller'),
        );

        if (controllerClass) {
          controllers.push(controllerClass);
        }
      }
    }

    return controllers;
  }
}
