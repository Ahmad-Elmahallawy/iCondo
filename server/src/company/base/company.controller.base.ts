import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
// @ts-ignore
import { RequestObject } from "../../request/base/Request";
import { Post } from "../../post/base/Post";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { CompanyService } from "../company.service";
import { Public } from "../../decorators/public.decorator";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CompanyCreateInput } from "./CompanyCreateInput";
import { Company } from "./Company";
import { CompanyFindManyArgs } from "./CompanyFindManyArgs";
import { CompanyWhereUniqueInput } from "./CompanyWhereUniqueInput";
import { CompanyUpdateInput } from "./CompanyUpdateInput";
import { CompanyEmployeeFindManyArgs } from "../../companyEmployee/base/CompanyEmployeeFindManyArgs";
import { CompanyEmployee } from "../../companyEmployee/base/CompanyEmployee";
import { CompanyEmployeeWhereUniqueInput } from "../../companyEmployee/base/CompanyEmployeeWhereUniqueInput";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { FileWhereUniqueInput } from "../../file/base/FileWhereUniqueInput";
import { ForumFindManyArgs } from "../../forum/base/ForumFindManyArgs";
import { Forum } from "../../forum/base/Forum";
import { ForumWhereUniqueInput } from "../../forum/base/ForumWhereUniqueInput";
import { PropertyFindManyArgs } from "../../property/base/PropertyFindManyArgs";
import { Property } from "../../property/base/Property";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestWhereUniqueInput } from "../../request/base/RequestWhereUniqueInput";
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class CompanyControllerBase {
  constructor(
    protected readonly service: CompanyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @Public()
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Company })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createCompany(
    @common.Body() data: CompanyCreateInput
  ): Promise<Company> {
    return await this.service.createCompany({
      data: data,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Company] })
  @ApiNestedQuery(CompanyFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async companies(@common.Req() request: Request): Promise<Company[]> {
    const args = plainToClass(CompanyFindManyArgs, request.query);
    return this.service.companies({
      ...args,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Company })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async company(
    @common.Param() params: CompanyWhereUniqueInput
  ): Promise<Company | null> {
    const result = await this.service.company({
      where: params,
      select: {
        createdAt: true,
        id: true,
        name: true,
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
  @swagger.ApiOkResponse({ type: Company })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateCompany(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() data: CompanyUpdateInput
  ): Promise<Company | null> {
    try {
      return await this.service.updateCompany({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          name: true,
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
  @swagger.ApiOkResponse({ type: Company })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteCompany(
    @common.Param() params: CompanyWhereUniqueInput
  ): Promise<Company | null> {
    try {
      return await this.service.deleteCompany({
        where: params,
        select: {
          createdAt: true,
          id: true,
          name: true,
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
  @common.Get("/:id/companyEmployees")
  @ApiNestedQuery(CompanyEmployeeFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "any",
  })
  async findCompanyEmployees(
    @common.Req() request: Request,
    @common.Param() params: CompanyWhereUniqueInput
  ): Promise<CompanyEmployee[]> {
    const query = plainToClass(CompanyEmployeeFindManyArgs, request.query);
    const results = await this.service.findCompanyEmployees(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/companyEmployees")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async connectCompanyEmployees(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: CompanyEmployeeWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      companyEmployees: {
        connect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/companyEmployees")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async updateCompanyEmployees(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: CompanyEmployeeWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      companyEmployees: {
        set: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/companyEmployees")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async disconnectCompanyEmployees(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: CompanyEmployeeWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      companyEmployees: {
        disconnect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/file")
  @ApiNestedQuery(FileFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFile(
    @common.Req() request: Request,
    @common.Param() params: CompanyWhereUniqueInput
  ): Promise<File[]> {
    const query = plainToClass(FileFindManyArgs, request.query);
    const results = await this.service.findFile(params.id, {
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

  @common.Post("/:id/file")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async connectFile(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      file: {
        connect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/file")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async updateFile(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      file: {
        set: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/file")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async disconnectFile(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      file: {
        disconnect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/forums")
  @ApiNestedQuery(ForumFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "read",
    possession: "any",
  })
  async findForums(
      @common.Req() request: Request,
      @common.Param() params: CompanyWhereUniqueInput
  ): Promise<Forum[]> {
    const query = plainToClass(ForumFindManyArgs, request.query);
    const results = await this.service.findForums(params.id, {
      ...query,
      select: {
        company: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
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

  @Public()
  @common.Post("/:id/forums")
  async connectForums(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: ForumWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      forums: {
        connect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Public()
  @common.Patch("/:id/forums")
  async updateForums(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: ForumWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      forums: {
        set: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/forums")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async disconnectForums(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: ForumWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      forums: {
        disconnect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/properties")
  @ApiNestedQuery(PropertyFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  async findProperties(
      @common.Req() request: Request,
      @common.Param() params: CompanyWhereUniqueInput
  ): Promise<Property[]> {
    const query = plainToClass(PropertyFindManyArgs, request.query);
    const results = await this.service.findProperties(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @Public()
  @common.Post("/:id/properties")
  async connectProperties(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: PropertyWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      properties: {
        connect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Public()
  @common.Patch("/:id/properties")
  async updateProperties(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: PropertyWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      properties: {
        set: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/properties")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async disconnectProperties(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: PropertyWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      properties: {
        disconnect: body,
      },
    };
    await this.service.updateCompany({
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
      @common.Param() params: CompanyWhereUniqueInput
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
    if (results === null) {
      throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @Public()
  @common.Post("/:id/requests")
  async connectRequests(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        connect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Public()
  @common.Patch("/:id/requests")
  async updateRequests(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        set: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/requests")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async disconnectRequests(
      @common.Param() params: CompanyWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        disconnect: body,
      },
    };
    await this.service.updateCompany({
      where: params,
      data,
      select: { id: true },
    });
  }
}
