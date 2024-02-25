import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RegistrationKeyModuleBase } from "./base/registrationKey.module.base";
import { RegistrationKeyService } from "./registrationKey.service";
import { RegistrationKeyController } from "./registrationKey.controller";

@Module({
  imports: [RegistrationKeyModuleBase, forwardRef(() => AuthModule)],
  controllers: [RegistrationKeyController],
  providers: [RegistrationKeyService],
  exports: [RegistrationKeyService],
})
export class RegistrationKeyModule {}
