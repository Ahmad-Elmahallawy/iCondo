import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { CommonFacilityResolverBase } from "./base/commonFacility.resolver.base";
import { CommonFacility } from "./base/CommonFacility";
import { CommonFacilityService } from "./commonFacility.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CommonFacility)
export class CommonFacilityResolver extends CommonFacilityResolverBase {
  constructor(
    protected readonly service: CommonFacilityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
