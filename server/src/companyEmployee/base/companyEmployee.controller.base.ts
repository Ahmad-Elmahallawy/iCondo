import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { Public } from "../../decorators/public.decorator";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { CompanyEmployeeService } from "../companyEmployee.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { CompanyEmployeeCreateInput } from "./CompanyEmployeeCreateInput";
import { CompanyEmployee } from "./CompanyEmployee";
import { CompanyEmployeeFindManyArgs } from "./CompanyEmployeeFindManyArgs";
import { CompanyEmployeeWhereUniqueInput } from "./CompanyEmployeeWhereUniqueInput";
import { CompanyEmployeeUpdateInput } from "./CompanyEmployeeUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class CompanyEmployeeControllerBase {
  constructor(
    protected readonly service: CompanyEmployeeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @Public()
  @common.Post()
  @swagger.ApiCreatedResponse({ type: CompanyEmployee })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createCompanyEmployee(
    @common.Body() data: CompanyEmployeeCreateInput
  ): Promise<CompanyEmployee> {
    return await this.service.createCompanyEmployee({
      data: {
        ...data,

        company: data.company
          ? {
              connect: data.company,
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

        id: true,

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
  @swagger.ApiOkResponse({ type: [CompanyEmployee] })
  @ApiNestedQuery(CompanyEmployeeFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async companyEmployees(
    @common.Req() request: Request
  ): Promise<CompanyEmployee[]> {
    const args = plainToClass(CompanyEmployeeFindManyArgs, request.query);
    return this.service.companyEmployees({
      ...args,
      select: {
        company: {
          select: {
            id: true,
          },
        },

        id: true,

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
  @swagger.ApiOkResponse({ type: CompanyEmployee })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async companyEmployee(
    @common.Param() params: CompanyEmployeeWhereUniqueInput
  ): Promise<CompanyEmployee | null> {
    const result = await this.service.companyEmployee({
      where: params,
      select: {
        company: {
          select: {
            id: true,
          },
        },

        id: true,

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
  @swagger.ApiOkResponse({ type: CompanyEmployee })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateCompanyEmployee(
    @common.Param() params: CompanyEmployeeWhereUniqueInput,
    @common.Body() data: CompanyEmployeeUpdateInput
  ): Promise<CompanyEmployee | null> {
    try {
      return await this.service.updateCompanyEmployee({
        where: params,
        data: {
          ...data,

          company: data.company
            ? {
                connect: data.company,
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

          id: true,

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
  @swagger.ApiOkResponse({ type: CompanyEmployee })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteCompanyEmployee(
    @common.Param() params: CompanyEmployeeWhereUniqueInput
  ): Promise<CompanyEmployee | null> {
    try {
      return await this.service.deleteCompanyEmployee({
        where: params,
        select: {
          company: {
            select: {
              id: true,
            },
          },

          id: true,

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
