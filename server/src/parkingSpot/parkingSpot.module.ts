import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ParkingSpotModuleBase } from "./base/parkingSpot.module.base";
import { ParkingSpotService } from "./parkingSpot.service";
import { ParkingSpotController } from "./parkingSpot.controller";

@Module({
  imports: [ParkingSpotModuleBase, forwardRef(() => AuthModule)],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
  exports: [ParkingSpotService],
})
export class ParkingSpotModule {}
