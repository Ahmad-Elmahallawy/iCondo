import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CompanyEmployeeService } from "./companyEmployee.service";
import { CompanyEmployeeControllerBase } from "./base/companyEmployee.controller.base";

@swagger.ApiTags("companyEmployees")
@common.Controller("companyEmployees")
export class CompanyEmployeeController extends CompanyEmployeeControllerBase {
  constructor(
    protected readonly service: CompanyEmployeeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
