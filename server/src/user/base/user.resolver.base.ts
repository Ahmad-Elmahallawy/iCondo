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
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { User } from "./User";
import { UserCountArgs } from "./UserCountArgs";
import { UserFindManyArgs } from "./UserFindManyArgs";
import { UserFindUniqueArgs } from "./UserFindUniqueArgs";
import { CreateUserArgs } from "./CreateUserArgs";
import { UpdateUserArgs } from "./UpdateUserArgs";
import { DeleteUserArgs } from "./DeleteUserArgs";
import { CompanyEmployeeFindManyArgs } from "../../companyEmployee/base/CompanyEmployeeFindManyArgs";
import { CompanyEmployee } from "../../companyEmployee/base/CompanyEmployee";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { PostFindManyArgs } from "../../post/base/PostFindManyArgs";
import { Post } from "../../post/base/Post";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestObject } from "../../request/base/Request";
import { ReservationFindManyArgs } from "../../reservation/base/ReservationFindManyArgs";
import { Reservation } from "../../reservation/base/Reservation";
import { UserCondoFindManyArgs } from "../../userCondo/base/UserCondoFindManyArgs";
import { UserCondo } from "../../userCondo/base/UserCondo";
import { UserService } from "../user.service";
import { NotificationFindManyArgs } from "../../notification/base/NotificationFindManyArgs";
import { Notification } from "../../notification/base/Notification";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => User)
export class UserResolverBase {
  constructor(
    protected readonly service: UserService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async _usersMeta(
    @graphql.Args() args: UserCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [User])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async users(@graphql.Args() args: UserFindManyArgs): Promise<User[]> {
    return this.service.users(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "own",
  })
  async user(@graphql.Args() args: UserFindUniqueArgs): Promise<User | null> {
    const result = await this.service.user(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @Public()
  @graphql.Mutation(() => User)
  async createUser(@graphql.Args() args: CreateUserArgs): Promise<User> {
    return await this.service.createUser({
      ...args,
      data: args.data,
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Notification], { name: "notifications" })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  async findNotifications(
      @graphql.Parent() parent: User,
      @graphql.Args() args: NotificationFindManyArgs
  ): Promise<Notification[]> {
    const results = await this.service.findNotifications(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => User)
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "any",
  })
  async updateUser(@graphql.Args() args: UpdateUserArgs): Promise<User | null> {
    try {
      return await this.service.updateUser({
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

  @graphql.Mutation(() => User)
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "delete",
    possession: "any",
  })
  async deleteUser(@graphql.Args() args: DeleteUserArgs): Promise<User | null> {
    try {
      return await this.service.deleteUser(args);
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
    @graphql.Parent() parent: User,
    @graphql.Args() args: CompanyEmployeeFindManyArgs
  ): Promise<CompanyEmployee[]> {
    const results = await this.service.findCompanyEmployees(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [File], { name: "files" })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFiles(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FileFindManyArgs
  ): Promise<File[]> {
    const results = await this.service.findFiles(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }


  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Post], { name: "posts" })
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "any",
  })
  async findPosts(
      @graphql.Parent() parent: User,
      @graphql.Args() args: PostFindManyArgs
  ): Promise<Post[]> {
    const results = await this.service.findPosts(parent.id, args);

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
      @graphql.Parent() parent: User,
      @graphql.Args() args: RequestFindManyArgs
  ): Promise<RequestObject[]> {
    const results = await this.service.findRequests(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Reservation], { name: "reservations" })
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "any",
  })
  async findReservations(
      @graphql.Parent() parent: User,
      @graphql.Args() args: ReservationFindManyArgs
  ): Promise<Reservation[]> {
    const results = await this.service.findReservations(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [UserCondo], { name: "userCondos" })
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "any",
  })
  async findUserCondos(
    @graphql.Parent() parent: User,
    @graphql.Args() args: UserCondoFindManyArgs
  ): Promise<UserCondo[]> {
    const results = await this.service.findUserCondos(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}
