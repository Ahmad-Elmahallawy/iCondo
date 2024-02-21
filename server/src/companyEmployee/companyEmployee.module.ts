import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CompanyEmployeeModuleBase } from "./base/companyEmployee.module.base";
import { CompanyEmployeeService } from "./companyEmployee.service";
import { CompanyEmployeeController } from "./companyEmployee.controller";

@Module({
  imports: [CompanyEmployeeModuleBase, forwardRef(() => AuthModule)],
  controllers: [CompanyEmployeeController],
  providers: [CompanyEmployeeService],
  exports: [CompanyEmployeeService],
})
export class CompanyEmployeeModule {}
