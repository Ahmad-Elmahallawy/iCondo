import { Test, TestingModule } from '@nestjs/testing';
import { CondoCostService } from './condo-cost.service';

describe('CondoCostService', () => {
  let service: CondoCostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CondoCostService],
    }).compile();

    service = module.get<CondoCostService>(CondoCostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
