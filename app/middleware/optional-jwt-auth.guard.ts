// auth/optional-jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class OptionalJwtAuthGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Get the metadata for the "public" decorator
    const isPublic = this.reflector.get<boolean>('public', context.getHandler());

    // If the route is marked as "public", allow access without JWT
    if (isPublic) {
      return true;
    }

    // Otherwise, apply JWT authentication
    return super.canActivate(context);
  }
}
