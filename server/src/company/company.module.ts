import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CompanyModuleBase } from "./base/company.module.base";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";

@Module({
  imports: [CompanyModuleBase, forwardRef(() => AuthModule)],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
