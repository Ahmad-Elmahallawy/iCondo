import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { Public } from "../../decorators/public.decorator";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { RegistrationKey } from "./RegistrationKey";
import { RegistrationKeyCountArgs } from "./RegistrationKeyCountArgs";
import { RegistrationKeyFindManyArgs } from "./RegistrationKeyFindManyArgs";
import { RegistrationKeyFindUniqueArgs } from "./RegistrationKeyFindUniqueArgs";
import { CreateRegistrationKeyArgs } from "./CreateRegistrationKeyArgs";
import { UpdateRegistrationKeyArgs } from "./UpdateRegistrationKeyArgs";
import { DeleteRegistrationKeyArgs } from "./DeleteRegistrationKeyArgs";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { RegistrationKeyService } from "../registrationKey.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => RegistrationKey)
export class RegistrationKeyResolverBase {
  constructor(
    protected readonly service: RegistrationKeyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @Public()
  @graphql.Query(() => MetaQueryPayload)
  async _registrationKeysMeta(
    @graphql.Args() args: RegistrationKeyCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @Public()
  @graphql.Query(() => [RegistrationKey])
  async registrationKeys(
    @graphql.Args() args: RegistrationKeyFindManyArgs
  ): Promise<RegistrationKey[]> {
    return this.service.registrationKeys(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => RegistrationKey, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "read",
    possession: "own",
  })
  async registrationKey(
    @graphql.Args() args: RegistrationKeyFindUniqueArgs
  ): Promise<RegistrationKey | null> {
    const result = await this.service.registrationKey(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => RegistrationKey)
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "create",
    possession: "any",
  })
  async createRegistrationKey(
    @graphql.Args() args: CreateRegistrationKeyArgs
  ): Promise<RegistrationKey> {
    return await this.service.createRegistrationKey({
      ...args,
      data: {
        ...args.data,

        condoUnit: {
          connect: args.data.condoUnit,
        },
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => RegistrationKey)
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "update",
    possession: "any",
  })
  async updateRegistrationKey(
    @graphql.Args() args: UpdateRegistrationKeyArgs
  ): Promise<RegistrationKey | null> {
    try {
      return await this.service.updateRegistrationKey({
        ...args,
        data: {
          ...args.data,

          condoUnit: {
            connect: args.data.condoUnit,
          },
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

  @graphql.Mutation(() => RegistrationKey)
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "delete",
    possession: "any",
  })
  async deleteRegistrationKey(
    @graphql.Args() args: DeleteRegistrationKeyArgs
  ): Promise<RegistrationKey | null> {
    try {
      return await this.service.deleteRegistrationKey(args);
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
    @graphql.Parent() parent: RegistrationKey
  ): Promise<CondoUnit | null> {
    const result = await this.service.getCondoUnit(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
