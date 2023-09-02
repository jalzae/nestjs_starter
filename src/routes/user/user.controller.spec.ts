import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ModelService } from '../../core/model.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ModelService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
