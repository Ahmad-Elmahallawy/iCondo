import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { PropertyService } from "../property.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { PropertyCreateInput } from "./PropertyCreateInput";
import { Property } from "./Property";
import { PropertyFindManyArgs } from "./PropertyFindManyArgs";
import { PropertyWhereUniqueInput } from "./PropertyWhereUniqueInput";
import { PropertyUpdateInput } from "./PropertyUpdateInput";
import { CondoUnitFindManyArgs } from "../../condoUnit/base/CondoUnitFindManyArgs";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { CondoUnitWhereUniqueInput } from "../../condoUnit/base/CondoUnitWhereUniqueInput";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { FileWhereUniqueInput } from "../../file/base/FileWhereUniqueInput";
import { LockerFindManyArgs } from "../../locker/base/LockerFindManyArgs";
import { Locker } from "../../locker/base/Locker";
import { LockerWhereUniqueInput } from "../../locker/base/LockerWhereUniqueInput";
import { ParkingSpotFindManyArgs } from "../../parkingSpot/base/ParkingSpotFindManyArgs";
import { ParkingSpot } from "../../parkingSpot/base/ParkingSpot";
import { ParkingSpotWhereUniqueInput } from "../../parkingSpot/base/ParkingSpotWhereUniqueInput";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestWhereUniqueInput } from "../../request/base/RequestWhereUniqueInput";
import {RequestObject} from "../../request/base/Request";
import { CommonFacilityFindManyArgs } from "../../commonFacility/base/CommonFacilityFindManyArgs";
import { CommonFacility } from "../../commonFacility/base/CommonFacility";
import { CommonFacilityWhereUniqueInput } from "../../commonFacility/base/CommonFacilityWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class PropertyControllerBase {
  constructor(
    protected readonly service: PropertyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Property })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createProperty(
    @common.Body() data: PropertyCreateInput
  ): Promise<Property> {
    return await this.service.createProperty({
          data: {
            ...data,

            company: data.company
                ? {
                  connect: data.company,
                }
                : undefined,
          },
      select: {
        address: true,
        company: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        id: true,
        lockerCount: true,
        name: true,
        parkingCount: true,
        unitCount: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Property] })
  @ApiNestedQuery(PropertyFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async properties(@common.Req() request: Request): Promise<Property[]> {
    const args = plainToClass(PropertyFindManyArgs, request.query);
    return this.service.properties({
      ...args,
      select: {
        address: true,
        createdAt: true,
        id: true,
        lockerCount: true,
        name: true,
        parkingCount: true,
        unitCount: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Property })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async property(
    @common.Param() params: PropertyWhereUniqueInput
  ): Promise<Property | null> {
    const result = await this.service.property({
      where: params,
      select: {
        address: true,
        createdAt: true,
        id: true,
        lockerCount: true,
        name: true,
        parkingCount: true,
        unitCount: true,
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
  @swagger.ApiOkResponse({ type: Property })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateProperty(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() data: PropertyUpdateInput
  ): Promise<Property | null> {
    try {
      return await this.service.updateProperty({
        where: params,
        data: {
          ...data,

          company: data.company
              ? {
                connect: data.company,
              }
              : undefined,
        },
        select: {
          address: true,
          createdAt: true,
          id: true,
          lockerCount: true,
          name: true,
          parkingCount: true,
          unitCount: true,
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
  @swagger.ApiOkResponse({ type: Property })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteProperty(
    @common.Param() params: PropertyWhereUniqueInput
  ): Promise<Property | null> {
    try {
      return await this.service.deleteProperty({
        where: params,
        select: {
          address: true,
          createdAt: true,
          id: true,
          lockerCount: true,
          name: true,
          parkingCount: true,
          unitCount: true,
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

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/condoUnits")
  @ApiNestedQuery(CondoUnitFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  async findCondoUnits(
    @common.Req() request: Request,
    @common.Param() params: PropertyWhereUniqueInput
  ): Promise<CondoUnit[]> {
    const query = plainToClass(CondoUnitFindManyArgs, request.query);
    const results = await this.service.findCondoUnits(params.id, {
      ...query,
      select: {
        condoFee: true,
        createdAt: true,
        id: true,

        locker: {
          select: {
            id: true,
          },
        },

        propertyID: {
          select: {
            id: true,
          },
        },

        registrationKeys: {
          select: {
            id: true,
          },
        },

        size: true,
        unitNumber: true,
        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/condoUnits")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async connectCondoUnits(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: CondoUnitWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      condoUnits: {
        connect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/condoUnits")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async updateCondoUnits(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: CondoUnitWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      condoUnits: {
        set: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/condoUnits")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async disconnectCondoUnits(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: CondoUnitWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      condoUnits: {
        disconnect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/files")
  @ApiNestedQuery(FileFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFiles(
    @common.Req() request: Request,
    @common.Param() params: PropertyWhereUniqueInput
  ): Promise<File[]> {
    const query = plainToClass(FileFindManyArgs, request.query);
    const results = await this.service.findFiles(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/files")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async connectFiles(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      files: {
        connect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/files")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async updateFiles(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      files: {
        set: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/files")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async disconnectFiles(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      files: {
        disconnect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/Lockers")
  @ApiNestedQuery(LockerFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "any",
  })
  async findLockers(
    @common.Req() request: Request,
    @common.Param() params: PropertyWhereUniqueInput
  ): Promise<Locker[]> {
    const query = plainToClass(LockerFindManyArgs, request.query);
    const results = await this.service.findLockers(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/Lockers")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async connectLockers(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: LockerWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      Lockers: {
        connect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/Lockers")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async updateLockers(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: LockerWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      Lockers: {
        set: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/Lockers")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async disconnectLockers(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: LockerWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      Lockers: {
        disconnect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/ParkingSpots")
  @ApiNestedQuery(ParkingSpotFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "any",
  })
  async findParkingSpots(
    @common.Req() request: Request,
    @common.Param() params: PropertyWhereUniqueInput
  ): Promise<ParkingSpot[]> {
    const query = plainToClass(ParkingSpotFindManyArgs, request.query);
    const results = await this.service.findParkingSpots(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/ParkingSpots")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async connectParkingSpots(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: ParkingSpotWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      ParkingSpots: {
        connect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/ParkingSpots")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async updateParkingSpots(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: ParkingSpotWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      ParkingSpots: {
        set: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/ParkingSpots")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async disconnectParkingSpots(
    @common.Param() params: PropertyWhereUniqueInput,
    @common.Body() body: ParkingSpotWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      ParkingSpots: {
        disconnect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }


  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/requests")
  @ApiNestedQuery(RequestFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async findRequests(
      @common.Req() request: Request,
      @common.Param() params: PropertyWhereUniqueInput
  ): Promise<RequestObject[]> {
    const query = plainToClass(RequestFindManyArgs, request.query);
    const results = await this.service.findRequests(params.id, {
      ...query,
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
        key: true,

        property: {
          select: {
            id: true,
          },
        },

        question: true,
        reportMessage: true,
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
    if (results === null) {
      throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/requests")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async connectRequests(
      @common.Param() params: PropertyWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        connect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/requests")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async updateRequests(
      @common.Param() params: PropertyWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        set: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/requests")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async disconnectRequests(
      @common.Param() params: PropertyWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        disconnect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/commonFacilities")
  @ApiNestedQuery(CommonFacilityFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "any",
  })
  async findCommonFacilities(
      @common.Req() request: Request,
      @common.Param() params: PropertyWhereUniqueInput
  ): Promise<CommonFacility[]> {
    const query = plainToClass(CommonFacilityFindManyArgs, request.query);
    const results = await this.service.findCommonFacilities(params.id, {
      ...query,
      select: {
        createdAt: true,
        facilityType: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        status: true,
        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/commonFacilities")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async connectCommonFacilities(
      @common.Param() params: PropertyWhereUniqueInput,
      @common.Body() body: CommonFacilityWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      commonFacilities: {
        connect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/commonFacilities")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async updateCommonFacilities(
      @common.Param() params: PropertyWhereUniqueInput,
      @common.Body() body: CommonFacilityWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      commonFacilities: {
        set: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/commonFacilities")
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async disconnectCommonFacilities(
      @common.Param() params: PropertyWhereUniqueInput,
      @common.Body() body: CommonFacilityWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      commonFacilities: {
        disconnect: body,
      },
    };
    await this.service.updateProperty({
      where: params,
      data,
      select: { id: true },
    });
  }
}
