import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { ModelService } from '../../core/model.service';
import { validation } from '../../../app/service/validator'
import { user } from '../../../app/model/user'
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

  @Post('/')
  async create(@Req() req, @Res() res) {
    const { init, setup } = new user();
    const result = validation(req.body, init())
    return res.json({
      status: true,
      message: 'Connected',
      data: result,
      body: req.body,
      schema: init()
    });
  }
}
