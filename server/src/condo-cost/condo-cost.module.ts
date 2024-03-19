import { Module } from '@nestjs/common';
import { CondoCostService } from './condo-cost/condo-cost.service';
import { CondoCostController } from './condo-cost/condo-cost.controller';

@Module({
  providers: [CondoCostService],
  controllers: [CondoCostController]
})
export class CondoCostModule {}
