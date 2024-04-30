import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { PostService } from "../post.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { RequestObject } from "../../request/base/Request";
import { PostCreateInput } from "./PostCreateInput";
import { Post } from "./Post";
import { PostFindManyArgs } from "./PostFindManyArgs";
import { PostWhereUniqueInput } from "./PostWhereUniqueInput";
import { PostUpdateInput } from "./PostUpdateInput";
import { ReplyFindManyArgs } from "../../reply/base/ReplyFindManyArgs";
import { Reply } from "../../reply/base/Reply";
import { ReplyWhereUniqueInput } from "../../reply/base/ReplyWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class PostControllerBase {
  constructor(
    protected readonly service: PostService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Post })
  @nestAccessControl.UseRoles({
  resource: "Post",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createPost(@common.Body() data: PostCreateInput): Promise<Post> {
    return await this.service.createPost({
      data: {
        ...data,

        forum: data.forum
          ? {
              connect: data.forum,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        content: true,
        createdAt: true,

        forum: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Post] })
  @ApiNestedQuery(PostFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async posts(@common.Req() request: Request): Promise<Post[]> {
    const args = plainToClass(PostFindManyArgs, request.query);
    return this.service.posts({
      ...args,
      select: {
        content: true,
        createdAt: true,

        forum: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Post })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async post(
    @common.Param() params: PostWhereUniqueInput
  ): Promise<Post | null> {
    const result = await this.service.post({
      where: params,
      select: {
        content: true,
        createdAt: true,

        forum: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
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
  @swagger.ApiOkResponse({ type: Post })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updatePost(
    @common.Param() params: PostWhereUniqueInput,
    @common.Body() data: PostUpdateInput
  ): Promise<Post | null> {
    try {
      return await this.service.updatePost({
        where: params,
        data: {
          ...data,

          forum: data.forum
            ? {
                connect: data.forum,
              }
            : undefined,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,
        },
        select: {
          content: true,
          createdAt: true,

          forum: {
            select: {
              id: true,
            },
          },

          id: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
  @swagger.ApiOkResponse({ type: Post })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deletePost(
    @common.Param() params: PostWhereUniqueInput
  ): Promise<Post | null> {
    try {
      return await this.service.deletePost({
        where: params,
        select: {
          content: true,
          createdAt: true,

          forum: {
            select: {
              id: true,
            },
          },

          id: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
  @common.Get("/:id/replies")
  @ApiNestedQuery(ReplyFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Reply",
    action: "read",
    possession: "any",
  })
  async findReplies(
      @common.Req() request: Request,
      @common.Param() params: PostWhereUniqueInput
  ): Promise<Reply[]> {
    const query = plainToClass(ReplyFindManyArgs, request.query);
    const results = await this.service.findReplies(params.id, {
      ...query,
      select: {
        content: true,
        createdAt: true,
        id: true,

        post: {
          select: {
            id: true,
          },
        },

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

  @common.Post("/:id/replies")
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "update",
    possession: "any",
  })
  async connectReplies(
      @common.Param() params: PostWhereUniqueInput,
      @common.Body() body: ReplyWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      replies: {
        connect: body,
      },
    };
    await this.service.updatePost({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/replies")
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "update",
    possession: "any",
  })
  async updateReplies(
      @common.Param() params: PostWhereUniqueInput,
      @common.Body() body: ReplyWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      replies: {
        set: body,
      },
    };
    await this.service.updatePost({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/replies")
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "update",
    possession: "any",
  })
  async disconnectReplies(
      @common.Param() params: PostWhereUniqueInput,
      @common.Body() body: ReplyWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      replies: {
        disconnect: body,
      },
    };
    await this.service.updatePost({
      where: params,
      data,
      select: { id: true },
    });
  }
}
