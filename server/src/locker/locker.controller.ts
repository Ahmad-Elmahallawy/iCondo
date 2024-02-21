import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LockerService } from "./locker.service";
import { LockerControllerBase } from "./base/locker.controller.base";

@swagger.ApiTags("lockers")
@common.Controller("lockers")
export class LockerController extends LockerControllerBase {
  constructor(
    protected readonly service: LockerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
