import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Forum, // @ts-ignore
  Post, // @ts-ignore
  Company,
} from "@prisma/client";

export class ForumServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ForumCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.ForumCountArgs>
  ): Promise<number> {
    return this.prisma.forum.count(args);
  }

  async forums<T extends Prisma.ForumFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ForumFindManyArgs>
  ): Promise<Forum[]> {
    return this.prisma.forum.findMany(args);
  }
  async forum<T extends Prisma.ForumFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ForumFindUniqueArgs>
  ): Promise<Forum | null> {
    return this.prisma.forum.findUnique(args);
  }
  async createForum<T extends Prisma.ForumCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ForumCreateArgs>
  ): Promise<Forum> {
    return this.prisma.forum.create<T>(args);
  }
  async updateForum<T extends Prisma.ForumUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ForumUpdateArgs>
  ): Promise<Forum> {
    return this.prisma.forum.update<T>(args);
  }
  async deleteForum<T extends Prisma.ForumDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ForumDeleteArgs>
  ): Promise<Forum> {
    return this.prisma.forum.delete(args);
  }

  async findPosts(
    parentId: string,
    args: Prisma.PostFindManyArgs
  ): Promise<Post[]> {
    return this.prisma.forum
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .posts(args);
  }

  async getCompany(parentId: string): Promise<Company | null> {
    return this.prisma.forum
        .findUnique({
          where: { id: parentId },
        })
        .company();
  }
}
