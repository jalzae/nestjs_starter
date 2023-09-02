import { Module } from '@nestjs/common';
import { UserController } from './routes/user/user.controller';
import { AppController } from './routes/app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ModelService } from './core/model.service';

@Module({
  imports: [PrismaModule],
  providers: [ModelService],
  controllers: [AppController, UserController]
})
export class AppModule { }

