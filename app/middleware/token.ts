import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    // You can perform additional checks or validations on the authHeader here if needed

    // If the Authorization header is present, you can store its value in a variable
    req['authorization'] = authHeader;

    next();
  }
}