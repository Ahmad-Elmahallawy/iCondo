import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { ParkingSpotResolverBase } from "./base/parkingSpot.resolver.base";
import { ParkingSpot } from "./base/ParkingSpot";
import { ParkingSpotService } from "./parkingSpot.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => ParkingSpot)
export class ParkingSpotResolver extends ParkingSpotResolverBase {
  constructor(
    protected readonly service: ParkingSpotService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
