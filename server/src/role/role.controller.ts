import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RoleService } from "./role.service";
import { RoleControllerBase } from "./base/role.controller.base";

@swagger.ApiTags("roles")
@common.Controller("roles")
export class RoleController extends RoleControllerBase {
  constructor(
    protected readonly service: RoleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
