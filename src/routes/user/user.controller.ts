import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { ModelService } from '../../core/model.service';
import { validation } from '../../../app/service/validator'
import { error, success } from '../../../app/service/response'
import { user } from '../../../app/model'

@Controller('user')
export class UserController {
  constructor(public readonly model: ModelService) { }
  @Get('/')
  async index(@Res() res) {
    const data = await this.model.findOne('user', { id: 2 })
    return res.json({
      status: data,
      message: 'Connected',
    });
  }

  @Post('/')
  async create(@Req() req, @Res() res) {
    try {
      const { init } = new user();

      const result = validation(req.body, init())
      if (!result.status) throw result.message

      const data = await this.model.create('user', req.body)
      if (!data) throw data.err;

      return success(res,
        200,
        'Sukses',
        data
      )

    } catch (e: any) {
      return error(res, 400, e)
    }
  }
}
