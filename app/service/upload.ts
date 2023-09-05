// src/upload/upload.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs';

export class UploadService {
  constructor() { }

  // Function to validate file format (extension)
  validateFileFormat(file: any, allowedExtensions: string[]) {
    const fileExt = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      throw new BadRequestException('Invalid file format. Allowed formats: ' + allowedExtensions.join(', '));
    }
  }

  // Function to handle single file upload with customizable target folder
  singleUpload(file: any, allowedExtensions: string[], targetFolder: string) {
    this.validateFileFormat(file, allowedExtensions);

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filePath = targetFolder + '/' + file.fieldname + '-' + uniqueSuffix + extname(file.originalname);

    fs.writeFileSync(filePath, file.buffer);

    return {
      path: filePath,
    };
  }
}
