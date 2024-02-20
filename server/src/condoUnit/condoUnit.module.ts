import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CondoUnitModuleBase } from "./base/condoUnit.module.base";
import { CondoUnitService } from "./condoUnit.service";
import { CondoUnitController } from "./condoUnit.controller";

@Module({
  imports: [CondoUnitModuleBase, forwardRef(() => AuthModule)],
  controllers: [CondoUnitController],
  providers: [CondoUnitService],
  exports: [CondoUnitService],
})
export class CondoUnitModule {}
