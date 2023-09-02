import { Controller, Get, Res } from '@nestjs/common';
import { ModelService } from '../../core/model.service';

@Controller('user')
export class UserController {
  constructor(public readonly model: ModelService) { }
  @Get('/')
  async index(@Res() res) {
    const data = await this.model.findAll('user')
    return res.json({
      status: true,
      message: 'Connected',
      data
    });
  }
}
