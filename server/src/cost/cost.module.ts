import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CostModuleBase } from "./base/cost.module.base";
import { CostService } from "./cost.service";
import { CostController } from "./cost.controller";
import { CostResolver } from "./cost.resolver";

@Module({
  imports: [CostModuleBase, forwardRef(() => AuthModule)],
  controllers: [CostController],
  providers: [CostService, CostResolver],
  exports: [CostService],
})
export class CostModule {}
