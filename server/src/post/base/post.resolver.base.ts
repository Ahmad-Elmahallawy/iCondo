
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
import { Post } from "./Post";
import { PostCountArgs } from "./PostCountArgs";
import { PostFindManyArgs } from "./PostFindManyArgs";
import { PostFindUniqueArgs } from "./PostFindUniqueArgs";
import { CreatePostArgs } from "./CreatePostArgs";
import { UpdatePostArgs } from "./UpdatePostArgs";
import { DeletePostArgs } from "./DeletePostArgs";
import { ReplyFindManyArgs } from "../../reply/base/ReplyFindManyArgs";
import { Reply } from "../../reply/base/Reply";
import { Forum } from "../../forum/base/Forum";
import { User } from "../../user/base/User";
import { PostService } from "../post.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Post)
export class PostResolverBase {
  constructor(
    protected readonly service: PostService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "any",
  })
  async _postsMeta(
    @graphql.Args() args: PostCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Post])
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "any",
  })
  async posts(@graphql.Args() args: PostFindManyArgs): Promise<Post[]> {
    return this.service.posts(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Post, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "own",
  })
  async post(@graphql.Args() args: PostFindUniqueArgs): Promise<Post | null> {
    const result = await this.service.post(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Post)
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "create",
    possession: "any",
  })
  async createPost(@graphql.Args() args: CreatePostArgs): Promise<Post> {
    return await this.service.createPost({
      ...args,
      data: {
        ...args.data,

        forum: args.data.forum
          ? {
              connect: args.data.forum,
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
  @graphql.Mutation(() => Post)
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "update",
    possession: "any",
  })
  async updatePost(@graphql.Args() args: UpdatePostArgs): Promise<Post | null> {
    try {
      return await this.service.updatePost({
        ...args,
        data: {
          ...args.data,

          forum: args.data.forum
            ? {
                connect: args.data.forum,
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

  @graphql.Mutation(() => Post)
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "delete",
    possession: "any",
  })
  async deletePost(@graphql.Args() args: DeletePostArgs): Promise<Post | null> {
    try {
      return await this.service.deletePost(args);
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
  @graphql.ResolveField(() => [Reply], { name: "replies" })
  @nestAccessControl.UseRoles({
    resource: "Reply",
    action: "read",
    possession: "any",
  })
  async findReplies(
      @graphql.Parent() parent: Post,
      @graphql.Args() args: ReplyFindManyArgs
  ): Promise<Reply[]> {
    const results = await this.service.findReplies(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }


  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Forum, {
    nullable: true,
    name: "forum",
  })
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "read",
    possession: "any",
  })
  async getForum(@graphql.Parent() parent: Post): Promise<Forum | null> {
    const result = await this.service.getForum(parent.id);

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
  async getUser(@graphql.Parent() parent: Post): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
