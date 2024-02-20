import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RegistrationKeyService } from "./registrationKey.service";
import { RegistrationKeyControllerBase } from "./base/registrationKey.controller.base";

@swagger.ApiTags("registrationKeys")
@common.Controller("registrationKeys")
export class RegistrationKeyController extends RegistrationKeyControllerBase {
  constructor(
    protected readonly service: RegistrationKeyService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
