import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isJwtExpired } from '../service/jwt';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    const check = isJwtExpired(authHeader)

    if (!check.status) {
      return res.status(401).json({ status: false, message: check.message });
    }

    const { userId, roleId } = check.data;

    if (userId) { }
    if (roleId) { }

    req['authorization'] = authHeader;

    next();
  }
}