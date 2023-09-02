import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    //TODO jwt check 

    
    req['authorization'] = authHeader;

    next();
  }
}