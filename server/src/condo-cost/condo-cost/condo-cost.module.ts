import { Module, Controller } from '@nestjs/common';
import { CondoCostService } from './condo-cost.service';
import { CondoCostController } from './condo-cost.controller';

@Module({
  providers: [CondoCostService],
  controllers: [CondoCostController]
})
export class CondoCostModule {}
