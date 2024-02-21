import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LockerModuleBase } from "./base/locker.module.base";
import { LockerService } from "./locker.service";
import { LockerController } from "./locker.controller";

@Module({
  imports: [LockerModuleBase, forwardRef(() => AuthModule)],
  controllers: [LockerController],
  providers: [LockerService],
  exports: [LockerService],
})
export class LockerModule {}
