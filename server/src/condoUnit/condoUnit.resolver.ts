import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { CondoUnitResolverBase } from "./base/condoUnit.resolver.base";
import { CondoUnit } from "./base/CondoUnit";
import { CondoUnitService } from "./condoUnit.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CondoUnit)
export class CondoUnitResolver extends CondoUnitResolverBase {
  constructor(
    protected readonly service: CondoUnitService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
