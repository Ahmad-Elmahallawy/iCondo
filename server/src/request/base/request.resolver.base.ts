import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { RequestObject } from "./Request";
import { RequestCountArgs } from "./RequestCountArgs";
import { RequestFindManyArgs } from "./RequestFindManyArgs";
import { RequestFindUniqueArgs } from "./RequestFindUniqueArgs";
import { CreateRequestArgs } from "./CreateRequestArgs";
import { UpdateRequestArgs } from "./UpdateRequestArgs";
import { DeleteRequestArgs } from "./DeleteRequestArgs";
import { Company } from "../../company/base/Company";
import { User } from "../../user/base/User";
import { RequestService } from "../request.service";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { CompanyEmployee } from "../../companyEmployee/base/CompanyEmployee";
import { Property } from "../../property/base/Property";
import { NotificationFindManyArgs } from "../../notification/base/NotificationFindManyArgs";
import { Notification } from "../../notification/base/Notification";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => RequestObject)
export class RequestResolverBase {
  constructor(
    protected readonly service: RequestService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async _requestsMeta(
    @graphql.Args() args: RequestCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [RequestObject])
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async requests(
    @graphql.Args() args: RequestFindManyArgs
  ): Promise<RequestObject[]> {
    return this.service.requests(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => RequestObject, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "own",
  })
  async request(
    @graphql.Args() args: RequestFindUniqueArgs
  ): Promise<RequestObject | null> {
    const result = await this.service.request(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => RequestObject)
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "create",
    possession: "any",
  })
  async createRequest(
    @graphql.Args() args: CreateRequestArgs
  ): Promise<RequestObject> {
    return await this.service.createRequest({
      ...args,
      data: {
        ...args.data,

        company: args.data.company
          ? {
              connect: args.data.company,
            }
          : undefined,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
        condoUnit: args.data.condoUnit
            ? {
              connect: args.data.condoUnit,
            }
            : undefined,

        employee: args.data.employee
            ? {
              connect: args.data.employee,
            }
            : undefined,

        property: args.data.property
            ? {
              connect: args.data.property,
            }
            : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => RequestObject)
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "update",
    possession: "any",
  })
  async updateRequest(
    @graphql.Args() args: UpdateRequestArgs
  ): Promise<RequestObject | null> {
    try {
      return await this.service.updateRequest({
        ...args,
        data: {
          ...args.data,

          company: args.data.company
            ? {
                connect: args.data.company,
              }
            : undefined,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,

          condoUnit: args.data.condoUnit
              ? {
                connect: args.data.condoUnit,
              }
              : undefined,

          employee: args.data.employee
              ? {
                connect: args.data.employee,
              }
              : undefined,

          property: args.data.property
              ? {
                connect: args.data.property,
              }
              : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => RequestObject)
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "delete",
    possession: "any",
  })
  async deleteRequest(
    @graphql.Args() args: DeleteRequestArgs
  ): Promise<RequestObject | null> {
    try {
      return await this.service.deleteRequest(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Company, {
    nullable: true,
    name: "company",
  })
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async getCompany(@graphql.Parent() parent: RequestObject): Promise<Company | null> {
    const result = await this.service.getCompany(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => CondoUnit, {
    nullable: true,
    name: "condoUnit",
  })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  async getCondoUnit(
      @graphql.Parent() parent: RequestObject
  ): Promise<CondoUnit | null> {
    const result = await this.service.getCondoUnit(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => CompanyEmployee, {
    nullable: true,
    name: "employee",
  })
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "any",
  })
  async getEmployee(
      @graphql.Parent() parent: RequestObject
  ): Promise<CompanyEmployee | null> {
    const result = await this.service.getEmployee(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Property, {
    nullable: true,
    name: "property",
  })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  async getProperty(
      @graphql.Parent() parent: RequestObject
  ): Promise<Property | null> {
    const result = await this.service.getProperty(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, {
    nullable: true,
    name: "user",
  })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async getUser(@graphql.Parent() parent: RequestObject): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Notification], { name: "notifications" })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  async findNotifications(
      @graphql.Parent() parent: RequestObject,
      @graphql.Args() args: NotificationFindManyArgs
  ): Promise<Notification[]> {
    const results = await this.service.findNotifications(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}
