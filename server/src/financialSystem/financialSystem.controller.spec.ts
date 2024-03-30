import { Test, TestingModule } from '@nestjs/testing';
import { FinancialSystemController } from './financialSystem.controller';

describe('FinancialSystemController', () => {
  let controller: FinancialSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialSystemController],
    }).compile();

    controller = module.get<FinancialSystemController>(FinancialSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
