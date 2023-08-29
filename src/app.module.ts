import { Module } from '@nestjs/common';
import { UserController } from './routes/user/user.controller';
import { AppController } from './routes/app.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AppController, UserController]
})
export class AppModule { }

