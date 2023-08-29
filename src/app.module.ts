import { Module } from '@nestjs/common';
import { ControllerLoader } from '../system/load-controller';

const controllerLoader = new ControllerLoader();
const controllers = controllerLoader.loadControllers('../app/controller');


@Module({
  imports: [],
  controllers: controllers,
  providers: [ControllerLoader],
})
export class AppModule { }

