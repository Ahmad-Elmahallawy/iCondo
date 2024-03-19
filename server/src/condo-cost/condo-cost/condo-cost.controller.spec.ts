import { Test, TestingModule } from '@nestjs/testing';
import { CondoCostController } from './condo-cost.controller';

describe('CondoCostController', () => {
  let controller: CondoCostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondoCostController],
    }).compile();

    controller = module.get<CondoCostController>(CondoCostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
