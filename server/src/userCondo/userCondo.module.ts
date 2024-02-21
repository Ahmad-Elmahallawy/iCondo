import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserCondoModuleBase } from "./base/userCondo.module.base";
import { UserCondoService } from "./userCondo.service";
import { UserCondoController } from "./userCondo.controller";

@Module({
  imports: [UserCondoModuleBase, forwardRef(() => AuthModule)],
  controllers: [UserCondoController],
  providers: [UserCondoService],
  exports: [UserCondoService],
})
export class UserCondoModule {}
