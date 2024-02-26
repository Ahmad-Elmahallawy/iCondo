import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import {FileService} from "./file.service";
import {FileControllerBase} from "./base/file.controller.base";
import {UploadedFile, UseInterceptors, Post} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from 'path';
import {FileCreateInput} from "./base/FileCreateInput";

@swagger.ApiTags("files")
@common.Controller("files")
export class FileController extends FileControllerBase {
    constructor(
        protected readonly service: FileService,
        @nestAccessControl.InjectRolesBuilder()
        protected readonly rolesBuilder: nestAccessControl.RolesBuilder
    ) {
        super(service, rolesBuilder);
    }

    @Post('')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './condofiles',
                filename: (req, file, callback) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
        }),
    )
    handleUpload(@UploadedFile() file: Express.Multer.File, @common.Body() data: FileCreateInput) {
        console.log('file', file)
        console.log(data.bucket.toString());
        console.log(data);
        return super.createFile(data).then(r => r)
    }
}
