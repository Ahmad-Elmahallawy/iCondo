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
import { CommonFacility } from "./CommonFacility";
import { CommonFacilityCountArgs } from "./CommonFacilityCountArgs";
import { CommonFacilityFindManyArgs } from "./CommonFacilityFindManyArgs";
import { CommonFacilityFindUniqueArgs } from "./CommonFacilityFindUniqueArgs";
import { CreateCommonFacilityArgs } from "./CreateCommonFacilityArgs";
import { UpdateCommonFacilityArgs } from "./UpdateCommonFacilityArgs";
import { DeleteCommonFacilityArgs } from "./DeleteCommonFacilityArgs";
import { ReservationFindManyArgs } from "../../reservation/base/ReservationFindManyArgs";
import { Reservation } from "../../reservation/base/Reservation";
import { CommonFacilityService } from "../commonFacility.service";
import { Property } from "../../property/base/Property";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CommonFacility)
export class CommonFacilityResolverBase {
  constructor(
    protected readonly service: CommonFacilityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "any",
  })
  async _commonFacilitiesMeta(
    @graphql.Args() args: CommonFacilityCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [CommonFacility])
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "any",
  })
  async commonFacilities(
    @graphql.Args() args: CommonFacilityFindManyArgs
  ): Promise<CommonFacility[]> {
    return this.service.commonFacilities(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => CommonFacility, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "own",
  })
  async commonFacility(
    @graphql.Args() args: CommonFacilityFindUniqueArgs
  ): Promise<CommonFacility | null> {
    const result = await this.service.commonFacility(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => CommonFacility)
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "create",
    possession: "any",
  })
  async createCommonFacility(
    @graphql.Args() args: CreateCommonFacilityArgs
  ): Promise<CommonFacility> {
    return await this.service.createCommonFacility({
      ...args,
      data: {
        ...args.data,

        property: args.data.property
            ? {
              connect: args.data.property,
            }
            : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => CommonFacility)
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "update",
    possession: "any",
  })
  async updateCommonFacility(
    @graphql.Args() args: UpdateCommonFacilityArgs
  ): Promise<CommonFacility | null> {
    try {
      return await this.service.updateCommonFacility({
        ...args,
        data: {
          ...args.data,

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

  @graphql.Mutation(() => CommonFacility)
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "delete",
    possession: "any",
  })
  async deleteCommonFacility(
    @graphql.Args() args: DeleteCommonFacilityArgs
  ): Promise<CommonFacility | null> {
    try {
      return await this.service.deleteCommonFacility(args);
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
  @graphql.ResolveField(() => [Reservation], { name: "availabilities" })
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "any",
  })
  async findAvailabilities(
    @graphql.Parent() parent: CommonFacility,
    @graphql.Args() args: ReservationFindManyArgs
  ): Promise<Reservation[]> {
    const results = await this.service.findAvailabilities(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
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
      @graphql.Parent() parent: CommonFacility
  ): Promise<Property | null> {
    const result = await this.service.getProperty(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
