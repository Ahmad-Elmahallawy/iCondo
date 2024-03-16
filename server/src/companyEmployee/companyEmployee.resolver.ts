import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { CompanyEmployeeResolverBase } from "./base/companyEmployee.resolver.base";
import { CompanyEmployee } from "./base/CompanyEmployee";
import { CompanyEmployeeService } from "./companyEmployee.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CompanyEmployee)
export class CompanyEmployeeResolver extends CompanyEmployeeResolverBase {
  constructor(
    protected readonly service: CompanyEmployeeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
