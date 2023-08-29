// protected.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { OptionalJwtAuthGuard } from './optional-jwt-auth.guard';
import { Public } from './public.decorator';

@Controller('protected')
@UseGuards(OptionalJwtAuthGuard)
export class ProtectedController {
  @Get()
  getProtectedData() {
    // This route requires JWT, as per OptionalJwtAuthGuard
  }

  @Get('public-route')
  @Public() // This route is marked as public and doesn't require JWT
  getPublicData() {
    // This route is public, no JWT required
  }
}
