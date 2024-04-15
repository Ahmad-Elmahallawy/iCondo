import { Module, Controller } from '@nestjs/common';
import { FinancialSystemService } from './financialSystem.service';
import { FinancialSystemController } from './financialSystem.controller';

@Module({
  providers: [FinancialSystemService],
  controllers: [FinancialSystemController]
})
export class FinancialSystemModule {}
