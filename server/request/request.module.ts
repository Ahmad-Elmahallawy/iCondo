import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RequestModuleBase } from "./base/request.module.base";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { RequestResolver } from "./request.resolver";

@Module({
  imports: [RequestModuleBase, forwardRef(() => AuthModule)],
  controllers: [RequestController],
  providers: [RequestService, RequestResolver],
  exports: [RequestService],
})
export class RequestModule {}
