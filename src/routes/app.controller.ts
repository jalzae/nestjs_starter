import { Controller, Get, Res, } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async index(@Res() res) {
    return res.json({
      status: true,
      message: 'Connected'
    });
  }

}
