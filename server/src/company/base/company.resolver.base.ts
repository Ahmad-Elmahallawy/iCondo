import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { Public } from "../../decorators/public.decorator";
import { Company } from "./Company";
import { CompanyCountArgs } from "./CompanyCountArgs";
import { CompanyFindManyArgs } from "./CompanyFindManyArgs";
import { CompanyFindUniqueArgs } from "./CompanyFindUniqueArgs";
import { CreateCompanyArgs } from "./CreateCompanyArgs";
import { UpdateCompanyArgs } from "./UpdateCompanyArgs";
import { DeleteCompanyArgs } from "./DeleteCompanyArgs";
import { CompanyEmployeeFindManyArgs } from "../../companyEmployee/base/CompanyEmployeeFindManyArgs";
import { CompanyEmployee } from "../../companyEmployee/base/CompanyEmployee";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { PropertyFindManyArgs } from "../../property/base/PropertyFindManyArgs";
import { Property } from "../../property/base/Property";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestObject } from "../../request/base/Request";
import { CompanyService } from "../company.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Company)
export class CompanyResolverBase {
  constructor(
    protected readonly service: CompanyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async _companiesMeta(
    @graphql.Args() args: CompanyCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Company])
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async companies(
    @graphql.Args() args: CompanyFindManyArgs
  ): Promise<Company[]> {
    return this.service.companies(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Company, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "own",
  })
  async company(
    @graphql.Args() args: CompanyFindUniqueArgs
  ): Promise<Company | null> {
    const result = await this.service.company(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @Public()
  @graphql.Mutation(() => Company)
  async createCompany(
    @graphql.Args() args: CreateCompanyArgs
  ): Promise<Company> {
    return await this.service.createCompany({
      ...args,
      data: args.data,
    });
  }

  @Public()
  @graphql.Mutation(() => Company)
  async updateCompany(
    @graphql.Args() args: UpdateCompanyArgs
  ): Promise<Company | null> {
    try {
      return await this.service.updateCompany({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Company)
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "delete",
    possession: "any",
  })
  async deleteCompany(
    @graphql.Args() args: DeleteCompanyArgs
  ): Promise<Company | null> {
    try {
      return await this.service.deleteCompany(args);
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
  @graphql.ResolveField(() => [CompanyEmployee], { name: "companyEmployees" })
  @nestAccessControl.UseRoles({
    resource: "CompanyEmployee",
    action: "read",
    possession: "any",
  })
  async findCompanyEmployees(
    @graphql.Parent() parent: Company,
    @graphql.Args() args: CompanyEmployeeFindManyArgs
  ): Promise<CompanyEmployee[]> {
    const results = await this.service.findCompanyEmployees(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [File], { name: "file" })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFile(
    @graphql.Parent() parent: Company,
    @graphql.Args() args: FileFindManyArgs
  ): Promise<File[]> {
    const results = await this.service.findFile(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Property], { name: "properties" })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  async findProperties(
    @graphql.Parent() parent: Company,
    @graphql.Args() args: PropertyFindManyArgs
  ): Promise<Property[]> {
    const results = await this.service.findProperties(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Request], { name: "requests" })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async findRequests(
      @graphql.Parent() parent: Company,
      @graphql.Args() args: RequestFindManyArgs
  ): Promise<RequestObject[]> {
    const results = await this.service.findRequests(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}
