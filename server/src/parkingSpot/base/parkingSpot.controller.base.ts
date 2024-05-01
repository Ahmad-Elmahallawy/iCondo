import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { ParkingSpotService } from "../parkingSpot.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ParkingSpotCreateInput } from "./ParkingSpotCreateInput";
import { ParkingSpot } from "./ParkingSpot";
import { ParkingSpotFindManyArgs } from "./ParkingSpotFindManyArgs";
import { ParkingSpotWhereUniqueInput } from "./ParkingSpotWhereUniqueInput";
import { ParkingSpotUpdateInput } from "./ParkingSpotUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ParkingSpotControllerBase {
  constructor(
    protected readonly service: ParkingSpotService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: ParkingSpot })
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createParkingSpot(
    @common.Body() data: ParkingSpotCreateInput
  ): Promise<ParkingSpot> {
    return await this.service.createParkingSpot({
      data: {
        ...data,

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
      },
      select: {
        condoUnit: {
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
  @swagger.ApiOkResponse({ type: [ParkingSpot] })
  @ApiNestedQuery(ParkingSpotFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async parkingSpots(@common.Req() request: Request): Promise<ParkingSpot[]> {
    const args = plainToClass(ParkingSpotFindManyArgs, request.query);
    return this.service.parkingSpots({
      ...args,
      select: {
        condoUnit: {
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
  @swagger.ApiOkResponse({ type: ParkingSpot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async parkingSpot(
    @common.Param() params: ParkingSpotWhereUniqueInput
  ): Promise<ParkingSpot | null> {
    const result = await this.service.parkingSpot({
      where: params,
      select: {
        condoUnit: {
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
  @swagger.ApiOkResponse({ type: ParkingSpot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateParkingSpot(
    @common.Param() params: ParkingSpotWhereUniqueInput,
    @common.Body() data: ParkingSpotUpdateInput
  ): Promise<ParkingSpot | null> {
    try {
      return await this.service.updateParkingSpot({
        where: params,
        data: {
          ...data,

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
        },
        select: {
          condoUnit: {
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
  @swagger.ApiOkResponse({ type: ParkingSpot })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteParkingSpot(
    @common.Param() params: ParkingSpotWhereUniqueInput
  ): Promise<ParkingSpot | null> {
    try {
      return await this.service.deleteParkingSpot({
        where: params,
        select: {
          condoUnit: {
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
