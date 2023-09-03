// rate-limit.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly maxRequests = 100; // number of requests
  private readonly interval = 60 * 10000; // 1 minute
  private readonly requestLog: Record<string, { count: number, lastAccessed: number }> = {};

  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const body = req.body;
    const params = req.query;
    const routeParams = req.params;

    const { originalUrl, method, ip } = req;
    const key = `${method}-${originalUrl}-${ip}`;

    if (!this.requestLog[key]) {
      this.requestLog[key] = { count: 1, lastAccessed: Date.now() };
    } else {
      const requestInfo = this.requestLog[key];
      const elapsedTime = Date.now() - requestInfo.lastAccessed;

      if (elapsedTime <= this.interval) {
        if (requestInfo.count >= this.maxRequests) {
          return res.status(429).json({ message: 'Too many requests. Please try again later.' });
        }
        requestInfo.count++;
      } else {
        requestInfo.count = 1;
        requestInfo.lastAccessed = Date.now();
      }
    }

    console.log(`User with IP ${ip} accessed ${method} ${originalUrl}`);

    next();
  }
}
