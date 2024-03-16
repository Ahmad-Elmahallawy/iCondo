import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ReservationModuleBase } from "./base/reservation.module.base";
import { ReservationService } from "./reservation.service";
import { ReservationController } from "./reservation.controller";
import { ReservationResolver } from "./reservation.resolver";

@Module({
  imports: [ReservationModuleBase, forwardRef(() => AuthModule)],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationResolver],
  exports: [ReservationService],
})
export class ReservationModule {}
