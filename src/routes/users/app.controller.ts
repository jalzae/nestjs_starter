import { Controller, Get, Post, Res, Req, Query, Body } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async index() {
    return 'Hello Word!';
  }

  @Get('/json')
  async example(@Req() req, @Res() res) {
    const params = req.query;
    const data = { params };
    return res.json(data);
  }

  //()SumStart
  //()SumFunc:Hello
  @Post('/function')
  async withvalidation(@Body() body, @Query() query, @Res() res) {
    const data = { ...body, query };
    return res.json(data);
  }
  //()SumEnd
}
