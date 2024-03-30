import { Test, TestingModule } from '@nestjs/testing';
import { FinancialSystemService } from './financialSystem.service';

describe('FinancialSystemService', () => {
  let service: FinancialSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialSystemService],
    }).compile();

    service = module.get<FinancialSystemService>(FinancialSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
