import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor() {
    this.ensureLogsDirectory();
  }

  private ensureLogsDirectory() {
    const logDirectory = path.join(__dirname, '..', 'writable', 'logs');

    // Check if the directory exists, and create it if it doesn't
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, ip } = req;
    const headers = req.headers;
    const body = req.body;
    const params = req.query;
    const routeParams = req.params;

    // Create a log object with the desired information
    const logData = {
      date: new Date().toISOString(),
      ip,
      method,
      url: `${originalUrl}`,
      params: `${JSON.stringify(routeParams)}`,
      query: `${JSON.stringify(params)} `,
      headers,
      body,
    };

    const logEntry = JSON.stringify(logData, null, 2);
    const logDirectory = path.join(__dirname, '..', 'writable', 'logs');
    const logFileName = `${new Date().toISOString().split('T')[0]}.log`;
    const logFilePath = path.join(logDirectory, logFileName);

    if (fs.existsSync(logFilePath)) {
      fs.appendFileSync(logFilePath, logEntry + '\n');
    } else {
      fs.writeFileSync(logFilePath, logEntry + '\n');
    }
    console.log(logEntry);

    next();
  }
}
