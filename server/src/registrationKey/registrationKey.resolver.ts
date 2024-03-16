import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { RegistrationKeyResolverBase } from "./base/registrationKey.resolver.base";
import { RegistrationKey } from "./base/RegistrationKey";
import { RegistrationKeyService } from "./registrationKey.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => RegistrationKey)
export class RegistrationKeyResolver extends RegistrationKeyResolverBase {
  constructor(
    protected readonly service: RegistrationKeyService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
