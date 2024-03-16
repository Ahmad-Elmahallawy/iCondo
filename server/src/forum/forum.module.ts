import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ForumModuleBase } from "./base/forum.module.base";
import { ForumService } from "./forum.service";
import { ForumController } from "./forum.controller";
import { ForumResolver } from "./forum.resolver";

@Module({
  imports: [ForumModuleBase, forwardRef(() => AuthModule)],
  controllers: [ForumController],
  providers: [ForumService, ForumResolver],
  exports: [ForumService],
})
export class ForumModule {}
