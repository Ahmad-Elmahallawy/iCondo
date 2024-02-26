import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { FileModuleBase } from "./base/file.module.base";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [FileModuleBase, forwardRef(() => AuthModule), MulterModule.register({ dest: './condofiles' }),],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
