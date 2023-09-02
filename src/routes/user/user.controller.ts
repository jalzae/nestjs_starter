import { Controller, Get, Res, } from '@nestjs/common';
import { success } from 'app/service/response';
import { ModelService } from 'src/core/model.service';
@Controller('user')

export class UserController {
  constructor(private readonly modelService: ModelService) { }
  @Get('/')
  async index(@Res() res) {
    return success(
      res, 200, true, 'Success', { id: 1900 }
    );
  }

  @Get('/one')
  async one(@Res() res) {
    const data = await this.modelService.findAll('user')
    return success(
      res, 200, true, 'Success', data
    );
  }
}
