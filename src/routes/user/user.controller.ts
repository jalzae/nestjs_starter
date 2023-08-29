import { Controller, Get, Res, } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/')
  async index(@Res() res) {
    return res.json({
      status: true,
      message: 'Connected'
    });
  }
}
