/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { RequestService } from "../request.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { RequestObject } from "./Request";
import { RequestCreateInput } from "./RequestCreateInput";
import { Post } from "../../post/base/Post";
import { RequestFindManyArgs } from "./RequestFindManyArgs";
import { RequestWhereUniqueInput } from "./RequestWhereUniqueInput";
import { RequestUpdateInput } from "./RequestUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class RequestControllerBase {
  constructor(
    protected readonly service: RequestService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Request })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createRequest(
    @common.Body() data: RequestCreateInput
  ): Promise<RequestObject> {
    return await this.service.createRequest({
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

        employee: data.employee
            ? {
              connect: data.employee,
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
        elevator: true,

        employee: {
          select: {
            id: true,
          },
        },
        key: true,

        property: {
          select: {
            id: true,
          },
        },

        question: true,
        reportMessage: true,
        createdAt: true,
        id: true,
        requestType: true,
        response: true,
        status: true,
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
  @swagger.ApiOkResponse({ type: [Request] })
  @ApiNestedQuery(RequestFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async requests(@common.Req() request: Request): Promise<RequestObject[]> {
    const args = plainToClass(RequestFindManyArgs, request.query);
    return this.service.requests({
      ...args,
      select: {
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
        elevator: true,

        employee: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        id: true,
        requestType: true,
        status: true,
        key: true,

        property: {
          select: {
            id: true,
          },
        },

        question: true,
        reportMessage: true,
        response: true,
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
  @swagger.ApiOkResponse({ type: Request })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async request(
    @common.Param() params: RequestWhereUniqueInput
  ): Promise<RequestObject | null> {
    const result = await this.service.request({
      where: params,
      select: {
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
        elevator: true,

        employee: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        id: true,
        requestType: true,
        status: true,
        key: true,

        property: {
          select: {
            id: true,
          },
        },

        question: true,
        reportMessage: true,
        response: true,
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
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Request })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateRequest(
    @common.Param() params: RequestWhereUniqueInput,
    @common.Body() data: RequestUpdateInput
  ): Promise<RequestObject | null> {
    try {
      return await this.service.updateRequest({
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

          employee: data.employee
              ? {
                connect: data.employee,
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
          elevator: true,

          employee: {
            select: {
              id: true,
            },
          },
          key: true,

          property: {
            select: {
              id: true,
            },
          },

          question: true,
          reportMessage: true,
          createdAt: true,
          id: true,
          requestType: true,
          status: true,
          updatedAt: true,
          response: true,
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
  @swagger.ApiOkResponse({ type: Request })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteRequest(
    @common.Param() params: RequestWhereUniqueInput
  ): Promise<RequestObject | null> {
    try {
      return await this.service.deleteRequest({
        where: params,
        select: {
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
          elevator: true,

          employee: {
            select: {
              id: true,
            },
          },
          id: true,
          requestType: true,
          status: true,
          updatedAt: true,
          key: true,

          property: {
            select: {
              id: true,
            },
          },

          question: true,
          reportMessage: true,
          response: true,
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