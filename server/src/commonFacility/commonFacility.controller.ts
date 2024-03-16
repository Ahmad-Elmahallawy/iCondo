import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CommonFacilityService } from "./commonFacility.service";
import { CommonFacilityControllerBase } from "./base/commonFacility.controller.base";

@swagger.ApiTags("commonFacilities")
@common.Controller("commonFacilities")
export class CommonFacilityController extends CommonFacilityControllerBase {
  constructor(
    protected readonly service: CommonFacilityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
