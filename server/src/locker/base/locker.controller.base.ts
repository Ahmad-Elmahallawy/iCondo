import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { LockerService } from "../locker.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { LockerCreateInput } from "./LockerCreateInput";
import { Locker } from "./Locker";
import { LockerFindManyArgs } from "./LockerFindManyArgs";
import { LockerWhereUniqueInput } from "./LockerWhereUniqueInput";
import { LockerUpdateInput } from "./LockerUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class LockerControllerBase {
  constructor(
    protected readonly service: LockerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Locker })
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createLocker(@common.Body() data: LockerCreateInput): Promise<Locker> {
    return await this.service.createLocker({
      data: {
        ...data,

        condoUnits: data.condoUnits
          ? {
              connect: data.condoUnits,
            }
          : undefined,

        property: data.property
          ? {
              connect: data.property,
            }
          : undefined,
      },
      select: {
        condoUnits: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Locker] })
  @ApiNestedQuery(LockerFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async lockers(@common.Req() request: Request): Promise<Locker[]> {
    const args = plainToClass(LockerFindManyArgs, request.query);
    return this.service.lockers({
      ...args,
      select: {
        condoUnits: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Locker })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async locker(
    @common.Param() params: LockerWhereUniqueInput
  ): Promise<Locker | null> {
    const result = await this.service.locker({
      where: params,
      select: {
        condoUnits: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Locker })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateLocker(
    @common.Param() params: LockerWhereUniqueInput,
    @common.Body() data: LockerUpdateInput
  ): Promise<Locker | null> {
    try {
      return await this.service.updateLocker({
        where: params,
        data: {
          ...data,

          condoUnits: data.condoUnits
            ? {
                connect: data.condoUnits,
              }
            : undefined,

          property: data.property
            ? {
                connect: data.property,
              }
            : undefined,
        },
        select: {
          condoUnits: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,

          property: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
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
  @swagger.ApiOkResponse({ type: Locker })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteLocker(
    @common.Param() params: LockerWhereUniqueInput
  ): Promise<Locker | null> {
    try {
      return await this.service.deleteLocker({
        where: params,
        select: {
          condoUnits: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,

          property: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
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
