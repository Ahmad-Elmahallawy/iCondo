import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { FileModuleBase } from "./base/file.module.base";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";

@Module({
  imports: [FileModuleBase, forwardRef(() => AuthModule)],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
