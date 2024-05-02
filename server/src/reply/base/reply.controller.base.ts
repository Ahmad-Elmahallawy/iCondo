import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { ReplyService } from "../reply.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ReplyCreateInput } from "./ReplyCreateInput";
import { Reply } from "./Reply";
import { Post } from "../../post/base/Post";
import { ReplyFindManyArgs } from "./ReplyFindManyArgs";
import { ReplyWhereUniqueInput } from "./ReplyWhereUniqueInput";
import { ReplyUpdateInput } from "./ReplyUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ReplyControllerBase {
    constructor(
        protected readonly service: ReplyService,
        protected readonly rolesBuilder: nestAccessControl.RolesBuilder
    ) {}
    @common.UseInterceptors(AclValidateRequestInterceptor)
    @common.Post()
    @swagger.ApiCreatedResponse({ type: Reply })
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "create",
        possession: "any",
    })
    @swagger.ApiForbiddenResponse({
        type: errors.ForbiddenException,
    })
    async createReply(@common.Body() data: ReplyCreateInput): Promise<Reply> {
        return await this.service.createReply({
            data: {
                ...data,

                post: {
                    connect: data.post,
                },
            },
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
    }

    @common.UseInterceptors(AclFilterResponseInterceptor)
    @common.Get()
    @swagger.ApiOkResponse({ type: [Reply] })
    @ApiNestedQuery(ReplyFindManyArgs)
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "read",
        possession: "any",
    })
    @swagger.ApiForbiddenResponse({
        type: errors.ForbiddenException,
    })
    async replies(@common.Req() request: Request): Promise<Reply[]> {
        const args = plainToClass(ReplyFindManyArgs, request.query);
        return this.service.replies({
            ...args,
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
    }

    @common.UseInterceptors(AclFilterResponseInterceptor)
    @common.Get("/:id")
    @swagger.ApiOkResponse({ type: Reply })
    @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "read",
        possession: "own",
    })
    @swagger.ApiForbiddenResponse({
        type: errors.ForbiddenException,
    })
    async reply(
        @common.Param() params: ReplyWhereUniqueInput
    ): Promise<Reply | null> {
        const result = await this.service.reply({
            where: params,
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
        if (result === null) {
            throw new errors.NotFoundException(
                `No resource was found for ${JSON.stringify(params)}`
            );
        }
        return result;
    }

    @common.UseInterceptors(AclValidateRequestInterceptor)
    @common.Patch("/:id")
    @swagger.ApiOkResponse({ type: Reply })
    @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "update",
        possession: "any",
    })
    @swagger.ApiForbiddenResponse({
        type: errors.ForbiddenException,
    })
    async updateReply(
        @common.Param() params: ReplyWhereUniqueInput,
        @common.Body() data: ReplyUpdateInput
    ): Promise<Reply | null> {
        try {
            return await this.service.updateReply({
                where: params,
                data: {
                    ...data,

                    post: {
                        connect: data.post,
                    },
                },
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
    @swagger.ApiOkResponse({ type: Reply })
    @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
    @nestAccessControl.UseRoles({
        resource: "Reply",
        action: "delete",
        possession: "any",
    })
    @swagger.ApiForbiddenResponse({
        type: errors.ForbiddenException,
    })
    async deleteReply(
        @common.Param() params: ReplyWhereUniqueInput
    ): Promise<Reply | null> {
        try {
            return await this.service.deleteReply({
                where: params,
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
        } catch (error) {
            if (isRecordNotFoundError(error)) {
                throw new errors.NotFoundException(
                    `No resource was found for ${JSON.stringify(params)}`
                );
            }
            throw error;
        }
    }
}