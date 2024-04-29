import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ReplyModuleBase } from "./base/reply.module.base";
import { ReplyService } from "./reply.service";
import { ReplyController } from "./reply.controller";
import { ReplyResolver } from "./reply.resolver";

@Module({
    imports: [ReplyModuleBase, forwardRef(() => AuthModule)],
    controllers: [ReplyController],
    providers: [ReplyService, ReplyResolver],
    exports: [ReplyService],
})
export class ReplyModule {}