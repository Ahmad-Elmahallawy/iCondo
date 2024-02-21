import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserCondoService } from "./userCondo.service";
import { UserCondoControllerBase } from "./base/userCondo.controller.base";

@swagger.ApiTags("userCondos")
@common.Controller("userCondos")
export class UserCondoController extends UserCondoControllerBase {
  constructor(
    protected readonly service: UserCondoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
