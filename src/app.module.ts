import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserController } from './routes/user/user.controller';
import { AppController } from './routes/app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ModelService } from './core/model.service';
import { TokenMiddleware } from '../app/middleware/token';
import { NotFoundMiddleware } from './core/exception_filter';

@Module({
  imports: [PrismaModule],
  providers: [ModelService],
  controllers: [AppController, UserController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NotFoundMiddleware)
      .exclude('/', '/user')
      .forRoutes('*');

    consumer
      .apply(TokenMiddleware)
      .exclude('/', '/user')
      .forRoutes('*');


  }
}

