import { Module } from "@nestjs/common";
import { ACLModule } from "../../auth/acl.module";
@Module({
  imports: [ACLModule],
  exports: [ACLModule],
})
export class UserModuleBase {}
