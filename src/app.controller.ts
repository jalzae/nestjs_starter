import { Controller, Get, Post, Res, Req, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from 'app/validation/valid'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/json')
  async example(@Req() req, @Res() res) {
    const params = req.query;
    const data = { params };
    return res.json(data);
  }

  @Post('/function')
  async withvalidation(@Body() body: CreateUserDto, @Query() query: CreateUserDto, @Res() res) {
    const data = { ...body, query };
    return res.json(data);
  }
}
