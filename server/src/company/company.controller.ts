import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CompanyService } from "./company.service";
import { CompanyControllerBase } from "./base/company.controller.base";

@swagger.ApiTags("companies")
@common.Controller("companies")
export class CompanyController extends CompanyControllerBase {
  constructor(
    protected readonly service: CompanyService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
