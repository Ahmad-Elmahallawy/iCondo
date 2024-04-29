import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Post, // @ts-ignore
  Reply,
  Forum, // @ts-ignore
  User,
} from "@prisma/client";

export class PostServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PostCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostCountArgs>
  ): Promise<number> {
    return this.prisma.post.count(args);
  }

  async posts<T extends Prisma.PostFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostFindManyArgs>
  ): Promise<Post[]> {
    return this.prisma.post.findMany(args);
  }
  async post<T extends Prisma.PostFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostFindUniqueArgs>
  ): Promise<Post | null> {
    return this.prisma.post.findUnique(args);
  }
  async createPost<T extends Prisma.PostCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostCreateArgs>
  ): Promise<Post> {
    return this.prisma.post.create<T>(args);
  }
  async updatePost<T extends Prisma.PostUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostUpdateArgs>
  ): Promise<Post> {
    return this.prisma.post.update<T>(args);
  }
  async deletePost<T extends Prisma.PostDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostDeleteArgs>
  ): Promise<Post> {
    return this.prisma.post.delete(args);
  }

  async findReplies(
      parentId: string,
      args: Prisma.ReplyFindManyArgs
  ): Promise<PrismaReply[]> {
    return this.prisma.post
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .replies(args);
  }

  async getForum(parentId: string): Promise<Forum | null> {
    return this.prisma.post
      .findUnique({
        where: { id: parentId },
      })
      .forum();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.post
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
