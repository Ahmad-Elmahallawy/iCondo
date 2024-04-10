import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { ReservationService } from "../reservation.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ReservationCreateInput } from "./ReservationCreateInput";
import { Reservation } from "./Reservation";
import { Post } from "../../post/base/Post";
import { ReservationFindManyArgs } from "./ReservationFindManyArgs";
import { ReservationWhereUniqueInput } from "./ReservationWhereUniqueInput";
import { ReservationUpdateInput } from "./ReservationUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ReservationControllerBase {
  constructor(
    protected readonly service: ReservationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Reservation })
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createReservation(
    @common.Body() data: ReservationCreateInput
  ): Promise<Reservation> {
    return await this.service.createReservation({
      data: {
        ...data,

        commonFacility: data.commonFacility
          ? {
              connect: data.commonFacility,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        availablity: true,

        commonFacility: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        notes: true,
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
  @swagger.ApiOkResponse({ type: [Reservation] })
  @ApiNestedQuery(ReservationFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async reservations(@common.Req() request: Request): Promise<Reservation[]> {
    const args = plainToClass(ReservationFindManyArgs, request.query);
    return this.service.reservations({
      ...args,
      select: {
        availablity: true,

        commonFacility: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        notes: true,
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
  @swagger.ApiOkResponse({ type: Reservation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async reservation(
    @common.Param() params: ReservationWhereUniqueInput
  ): Promise<Reservation | null> {
    const result = await this.service.reservation({
      where: params,
      select: {
        availablity: true,

        commonFacility: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        notes: true,
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
  @swagger.ApiOkResponse({ type: Reservation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateReservation(
    @common.Param() params: ReservationWhereUniqueInput,
    @common.Body() data: ReservationUpdateInput
  ): Promise<Reservation | null> {
    try {
      return await this.service.updateReservation({
        where: params,
        data: {
          ...data,

          commonFacility: data.commonFacility
            ? {
                connect: data.commonFacility,
              }
            : undefined,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,
        },
        select: {
          availablity: true,

          commonFacility: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          notes: true,
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
  @swagger.ApiOkResponse({ type: Reservation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteReservation(
    @common.Param() params: ReservationWhereUniqueInput
  ): Promise<Reservation | null> {
    try {
      return await this.service.deleteReservation({
        where: params,
        select: {
          availablity: true,

          commonFacility: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          notes: true,
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
