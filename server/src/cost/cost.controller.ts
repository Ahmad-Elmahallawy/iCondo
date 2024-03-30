import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CostService } from "./cost.service";
import { CostControllerBase } from "./base/cost.controller.base";

@swagger.ApiTags("costs")
@common.Controller("costs")
export class CostController extends CostControllerBase {
  constructor(
    protected readonly service: CostService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
