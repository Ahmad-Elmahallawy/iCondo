import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PropertyModuleBase } from "./base/property.module.base";
import { PropertyService } from "./property.service";
import { PropertyController } from "./property.controller";

@Module({
  imports: [PropertyModuleBase, forwardRef(() => AuthModule)],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
