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
import { Reply } from "./Reply";
import { ReplyCountArgs } from "./ReplyCountArgs";
import { ReplyFindManyArgs } from "./ReplyFindManyArgs";
import { ReplyFindUniqueArgs } from "./ReplyFindUniqueArgs";
import { CreateReplyArgs } from "./CreateReplyArgs";
import { UpdateReplyArgs } from "./UpdateReplyArgs";
import { DeleteReplyArgs } from "./DeleteReplyArgs";
import { Post } from "../../post/base/Post";
import { ReplyService } from "../reply.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Reply)
export class ReplyResolverBase {
    constructor(
        protected readonly service: ReplyService,
        protected readonly rolesBuilder: nestAccessControl.RolesBuilder
    ) {}

    @graphql.Query(() => MetaQueryPayload)
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "read",
        possession: "any",
    })
    async _repliesMeta(
        @graphql.Args() args: ReplyCountArgs
    ): Promise<MetaQueryPayload> {
        const result = await this.service.count(args);
        return {
            count: result,
        };
    }

    @common.UseInterceptors(AclFilterResponseInterceptor)
    @graphql.Query(() => [Reply])
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "read",
        possession: "any",
    })
    async replies(@graphql.Args() args: ReplyFindManyArgs): Promise<Reply[]> {
        return this.service.replies(args);
    }

    @common.UseInterceptors(AclFilterResponseInterceptor)
    @graphql.Query(() => Reply, { nullable: true })
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "read",
        possession: "own",
    })
    async reply(
        @graphql.Args() args: ReplyFindUniqueArgs
    ): Promise<Reply | null> {
        const result = await this.service.reply(args);
        if (result === null) {
            return null;
        }
        return result;
    }

    @common.UseInterceptors(AclValidateRequestInterceptor)
    @graphql.Mutation(() => Reply)
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "create",
        possession: "any",
    })
    async createReply(@graphql.Args() args: CreateReplyArgs): Promise<Reply> {
        return await this.service.createReply({
            ...args,
            data: {
                ...args.data,

                post: {
                    connect: args.data.post,
                },
            },
        });
    }

    @common.UseInterceptors(AclValidateRequestInterceptor)
    @graphql.Mutation(() => Reply)
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "update",
        possession: "any",
    })
    async updateReply(
        @graphql.Args() args: UpdateReplyArgs
    ): Promise<Reply | null> {
        try {
            return await this.service.updateReply({
                ...args,
                data: {
                    ...args.data,

                    post: {
                        connect: args.data.post,
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

    @graphql.Mutation(() => Reply)
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "delete",
        possession: "any",
    })
    async deleteReply(
        @graphql.Args() args: DeleteReplyArgs
    ): Promise<Reply | null> {
        try {
            return await this.service.deleteReply(args);
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
    @graphql.ResolveField(() => Post, {
        nullable: true,
        name: "post",
    })
    @nestAccessControl.UseRoles({
        resource: "Post",
        action: "read",
        possession: "any",
    })
    async getPost(@graphql.Parent() parent: Reply): Promise<Post | null> {
        const result = await this.service.getPost(parent.id);

        if (!result) {
            return null;
        }
        return result;
    }
}