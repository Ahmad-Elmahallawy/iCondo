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
import { ParkingSpot } from "./ParkingSpot";
import { ParkingSpotCountArgs } from "./ParkingSpotCountArgs";
import { ParkingSpotFindManyArgs } from "./ParkingSpotFindManyArgs";
import { ParkingSpotFindUniqueArgs } from "./ParkingSpotFindUniqueArgs";
import { CreateParkingSpotArgs } from "./CreateParkingSpotArgs";
import { UpdateParkingSpotArgs } from "./UpdateParkingSpotArgs";
import { DeleteParkingSpotArgs } from "./DeleteParkingSpotArgs";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { Property } from "../../property/base/Property";
import { ParkingSpotService } from "../parkingSpot.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => ParkingSpot)
export class ParkingSpotResolverBase {
  constructor(
    protected readonly service: ParkingSpotService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "any",
  })
  async _parkingSpotsMeta(
    @graphql.Args() args: ParkingSpotCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [ParkingSpot])
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "any",
  })
  async parkingSpots(
    @graphql.Args() args: ParkingSpotFindManyArgs
  ): Promise<ParkingSpot[]> {
    return this.service.parkingSpots(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => ParkingSpot, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "own",
  })
  async parkingSpot(
    @graphql.Args() args: ParkingSpotFindUniqueArgs
  ): Promise<ParkingSpot | null> {
    const result = await this.service.parkingSpot(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => ParkingSpot)
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "create",
    possession: "any",
  })
  async createParkingSpot(
    @graphql.Args() args: CreateParkingSpotArgs
  ): Promise<ParkingSpot> {
    return await this.service.createParkingSpot({
      ...args,
      data: {
        ...args.data,

        condoUnit: args.data.condoUnit
          ? {
              connect: args.data.condoUnit,
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
  @graphql.Mutation(() => ParkingSpot)
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "update",
    possession: "any",
  })
  async updateParkingSpot(
    @graphql.Args() args: UpdateParkingSpotArgs
  ): Promise<ParkingSpot | null> {
    try {
      return await this.service.updateParkingSpot({
        ...args,
        data: {
          ...args.data,

          condoUnit: args.data.condoUnit
            ? {
                connect: args.data.condoUnit,
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

  @graphql.Mutation(() => ParkingSpot)
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "delete",
    possession: "any",
  })
  async deleteParkingSpot(
    @graphql.Args() args: DeleteParkingSpotArgs
  ): Promise<ParkingSpot | null> {
    try {
      return await this.service.deleteParkingSpot(args);
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
    @graphql.Parent() parent: ParkingSpot
  ): Promise<CondoUnit | null> {
    const result = await this.service.getCondoUnit(parent.id);

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
    @graphql.Parent() parent: ParkingSpot
  ): Promise<Property | null> {
    const result = await this.service.getProperty(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
