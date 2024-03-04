import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ParkingSpotService } from "./parkingSpot.service";
import { ParkingSpotControllerBase } from "./base/parkingSpot.controller.base";

@swagger.ApiTags("parkingSpots")
@common.Controller("parkingSpots")
export class ParkingSpotController extends ParkingSpotControllerBase {
  constructor(
    protected readonly service: ParkingSpotService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
