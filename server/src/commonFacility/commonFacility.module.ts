import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CommonFacilityModuleBase } from "./base/commonFacility.module.base";
import { CommonFacilityService } from "./commonFacility.service";
import { CommonFacilityController } from "./commonFacility.controller";
import { CommonFacilityResolver } from "./commonFacility.resolver";

@Module({
  imports: [CommonFacilityModuleBase, forwardRef(() => AuthModule)],
  controllers: [CommonFacilityController],
  providers: [CommonFacilityService, CommonFacilityResolver],
  exports: [CommonFacilityService],
})
export class CommonFacilityModule {}
