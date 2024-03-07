import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import {Request} from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { FileService } from "../file.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { FileCreateInput } from "./FileCreateInput";
import { File } from "./File";
import { FileFindManyArgs } from "./FileFindManyArgs";
import { FileWhereUniqueInput } from "./FileWhereUniqueInput";
import { FileUpdateInput } from "./FileUpdateInput";
import {FileInterceptor} from "@nestjs/platform-express";
import {MinioServer} from "../minioServer";
import {UploadedFile} from "@nestjs/common";
import {extname} from "path";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class FileControllerBase {
  constructor(
    protected readonly service: FileService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly minioServer: MinioServer
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.UseInterceptors(FileInterceptor('file'))
  @common.Post()
  @swagger.ApiCreatedResponse({ type: File })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createFile(@UploadedFile() file: Express.Multer.File, @common.Body() data: FileCreateInput): Promise<File> {
    const uniqueSuffix =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
    data.name = filename;
    await this.minioServer.uploadFile(data.bucket, file, data.name)
    return await this.service.createFile({
      data: {
        ...data,

        company: data.company
          ? {
              connect: data.company,
            }
          : undefined,

        condoUnit: data.condoUnit
          ? {
              connect: data.condoUnit,
            }
          : undefined,

        property: data.property
          ? {
              connect: data.property,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        bucket: true,

        company: {
          select: {
            id: true,
          },
        },

        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        name: true,

        property: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [File] })
  @ApiNestedQuery(FileFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async files(@common.Req() request: Request): Promise<File[]> {
    const args = plainToClass(FileFindManyArgs, request.query);
    return this.service.files({
      ...args,
      select: {
        bucket: true,

        company: {
          select: {
            id: true,
          },
        },

        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        name: true,

        property: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: File })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async file(
    @common.Param() params: FileWhereUniqueInput
  ): Promise<{
      bucket: string;
      createdAt: Date;
      companyID: number | null;
      name: string;
      condoUnitID: number | null;
      id: number;
      propertyID: number | null;
      userID: number | null;
      url: unknown;
      updatedAt: Date
  }> {

    const result = await this.service.file({
      where: params,
      select: {
        bucket: true,

        company: {
          select: {
            id: true,
          },
        },

        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        name: true,

        property: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    const link = await this.minioServer.getFile(result?.bucket, result.name)
    console.log(result)
    console.log(link)
    return {...result, url: link};
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: File })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateFile(
    @common.Param() params: FileWhereUniqueInput,
    @common.Body() data: FileUpdateInput
  ): Promise<File | null> {
    try {
      return await this.service.updateFile({
        where: params,
        data: {
          ...data,

          company: data.company
            ? {
                connect: data.company,
              }
            : undefined,

          condoUnit: data.condoUnit
            ? {
                connect: data.condoUnit,
              }
            : undefined,

          property: data.property
            ? {
                connect: data.property,
              }
            : undefined,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,
        },
        select: {
          bucket: true,

          company: {
            select: {
              id: true,
            },
          },

          condoUnit: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          name: true,

          property: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: File })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteFile(
    @common.Param() params: FileWhereUniqueInput
  ): Promise<File | null> {
    try {
      return await this.service.deleteFile({
        where: params,
        select: {
          bucket: true,

          company: {
            select: {
              id: true,
            },
          },

          condoUnit: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          name: true,

          property: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
