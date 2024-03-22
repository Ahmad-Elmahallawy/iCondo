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
import { CompanyEmployee } from "./CompanyEmployee";
import { CompanyEmployeeCountArgs } from "./CompanyEmployeeCountArgs";
import { CompanyEmployeeFindManyArgs } from "./CompanyEmployeeFindManyArgs";
import { CompanyEmployeeFindUniqueArgs } from "./CompanyEmployeeFindUniqueArgs";
import { CreateCompanyEmployeeArgs } from "./CreateCompanyEmployeeArgs";
import { UpdateCompanyEmployeeArgs } from "./UpdateCompanyEmployeeArgs";
import { DeleteCompanyEmployeeArgs } from "./DeleteCompanyEmployeeArgs";
import { Company } from "../../company/base/Company";
import { User } from "../../user/base/User";
import { CompanyEmployeeService } from "../companyEmployee.service";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestObject } from "../../request/base/Request";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CompanyEmployee)
export class CompanyEmployeeResolverBase {
  constructor(
    protected readonly service: CompanyEmployeeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "any",
  })
  async _companyEmployeesMeta(
    @graphql.Args() args: CompanyEmployeeCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [CompanyEmployee])
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "any",
  })
  async companyEmployees(
    @graphql.Args() args: CompanyEmployeeFindManyArgs
  ): Promise<CompanyEmployee[]> {
    return this.service.companyEmployees(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => CompanyEmployee, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "own",
  })
  async companyEmployee(
    @graphql.Args() args: CompanyEmployeeFindUniqueArgs
  ): Promise<CompanyEmployee | null> {
    const result = await this.service.companyEmployee(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => CompanyEmployee)
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "create",
    possession: "any",
  })
  async createCompanyEmployee(
    @graphql.Args() args: CreateCompanyEmployeeArgs
  ): Promise<CompanyEmployee> {
    return await this.service.createCompanyEmployee({
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
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => CompanyEmployee)
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "update",
    possession: "any",
  })
  async updateCompanyEmployee(
    @graphql.Args() args: UpdateCompanyEmployeeArgs
  ): Promise<CompanyEmployee | null> {
    try {
      return await this.service.updateCompanyEmployee({
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

  @graphql.Mutation(() => CompanyEmployee)
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "delete",
    possession: "any",
  })
  async deleteCompanyEmployee(
    @graphql.Args() args: DeleteCompanyEmployeeArgs
  ): Promise<CompanyEmployee | null> {
    try {
      return await this.service.deleteCompanyEmployee(args);
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
  async getCompany(
    @graphql.Parent() parent: CompanyEmployee
  ): Promise<Company | null> {
    const result = await this.service.getCompany(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Request], { name: "requests" })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async findRequests(
      @graphql.Parent() parent: CompanyEmployee,
      @graphql.Args() args: RequestFindManyArgs
  ): Promise<RequestObject[]> {
    const results = await this.service.findRequests(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
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
  async getUser(
    @graphql.Parent() parent: CompanyEmployee
  ): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
