import { Module } from '@nestjs/common';
import { UserController } from './routes/user/user.controller';
import { AppController } from './routes/app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { TaskstModule } from './taskst/taskst.module';

@Module({
  imports: [PrismaModule, TaskstModule],
  providers: [],
  controllers: [AppController, UserController]
})
export class AppModule { }

