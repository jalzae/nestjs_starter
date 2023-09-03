import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { ModelService } from '../../core/model.service';
import { validation } from '../../../app/service/validator'
import { error, success } from '../../../app/service/response'
import * as models from '../../../app/model'

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

      const data = await this.model.findOne('user')
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
