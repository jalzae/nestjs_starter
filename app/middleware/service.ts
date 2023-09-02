import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['service'];

    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isDevelopment) {
      if (!authHeader) {
        return res.status(401).json({ status: false, message: 'Service not found' });
      }
      req['service'] = authHeader;
    }

    next();
  }
}