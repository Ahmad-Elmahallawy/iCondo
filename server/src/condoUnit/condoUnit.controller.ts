import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CondoUnitService } from "./condoUnit.service";
import { CondoUnitControllerBase } from "./base/condoUnit.controller.base";

@swagger.ApiTags("condoUnits")
@common.Controller("condoUnits")
export class CondoUnitController extends CondoUnitControllerBase {
  constructor(
    protected readonly service: CondoUnitService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
