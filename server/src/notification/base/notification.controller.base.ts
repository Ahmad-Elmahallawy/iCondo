import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { NotificationService } from "../notification.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { RequestObject } from "../../request/base/Request";
import { NotificationCreateInput } from "./NotificationCreateInput";
import { Notification } from "./Notification";
import { Post } from "../../post/base/Post";
import { NotificationFindManyArgs } from "./NotificationFindManyArgs";
import { NotificationWhereUniqueInput } from "./NotificationWhereUniqueInput";
import { NotificationUpdateInput } from "./NotificationUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class NotificationControllerBase {
  constructor(
      protected readonly service: NotificationService,
      protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Notification })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createNotification(
      @common.Body() data: NotificationCreateInput
  ): Promise<Notification> {
    return await this.service.createNotification({
      data: {
        ...data,

        request: data.request
            ? {
              connect: data.request,
            }
            : undefined,

        user: data.user
            ? {
              connect: data.user,
            }
            : undefined,
      },
      select: {
        createdAt: true,
        id: true,
        message: true,

        request: {
          select: {
            id: true,
          },
        },

        title: true,
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
  @swagger.ApiOkResponse({ type: [Notification] })
  @ApiNestedQuery(NotificationFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async notifications(@common.Req() request: Request): Promise<Notification[]> {
    const args = plainToClass(NotificationFindManyArgs, request.query);
    return this.service.notifications({
      ...args,
      select: {
        createdAt: true,
        id: true,
        message: true,


        title: true,
        updatedAt: true,

      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Notification })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async notification(
      @common.Param() params: NotificationWhereUniqueInput
  ): Promise<Notification | null> {
    const result = await this.service.notification({
      where: params,
      select: {
        createdAt: true,
        id: true,
        message: true,



        title: true,
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
  @swagger.ApiOkResponse({ type: Notification })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateNotification(
      @common.Param() params: NotificationWhereUniqueInput,
      @common.Body() data: NotificationUpdateInput
  ): Promise<Notification | null> {
    try {
      return await this.service.updateNotification({
        where: params,
        data: {
          ...data,

          request: data.request
              ? {
                connect: data.request,
              }
              : undefined,

          user: data.user
              ? {
                connect: data.user,
              }
              : undefined,
        },
        select: {
          createdAt: true,
          id: true,
          message: true,
          title: true,
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
  @swagger.ApiOkResponse({ type: Notification })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteNotification(
      @common.Param() params: NotificationWhereUniqueInput
  ): Promise<Notification | null> {
    try {
      return await this.service.deleteNotification({
        where: params,
        select: {
          createdAt: true,
          id: true,
          message: true,



          title: true,
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
