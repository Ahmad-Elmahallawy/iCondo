import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  User, // @ts-ignore
  CompanyEmployee, // @ts-ignore
  File, // @ts-ignore
  Post, // @ts-ignore
  Request, // @ts-ignore
  Reservation, // @ts-ignore
  UserCondo,
} from "@prisma/client";

import { PasswordService } from "../../auth/password.service";
import { transformStringFieldUpdateInput } from "../../prisma.util";

export class UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {}

  async count<T extends Prisma.UserCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCountArgs>
  ): Promise<number> {
    return this.prisma.user.count(args);
  }

  async users<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
  ): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }
  async user<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
  ): Promise<User | null> {
    return this.prisma.user.findUnique(args);
  }
  async createUser<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
  ): Promise<User> {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    });
  }
  async updateUser<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
  ): Promise<User> {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password &&
          (await transformStringFieldUpdateInput(
            args.data.password,
            (password) => this.passwordService.hash(password)
          )),
      },
    });
  }
  async deleteUser<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
  ): Promise<User> {
    return this.prisma.user.delete(args);
  }

  async findCompanyEmployees(
    parentId: number,
    args: Prisma.CompanyEmployeeFindManyArgs
  ): Promise<CompanyEmployee[]> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .companyEmployees(args);
  }

  async findFiles(
    parentId: number,
    args: Prisma.FileFindManyArgs
  ): Promise<File[]> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .files(args);
  }


  async findPosts(
      parentId: number,
      args: Prisma.PostFindManyArgs
  ): Promise<Post[]> {
    return this.prisma.user
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .posts(args);
  }

  async findRequests(
      parentId: number,
      args: Prisma.RequestFindManyArgs
  ): Promise<Request[]> {
    return this.prisma.user
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .requests(args);
  }

  async findReservations(
      parentId: number,
      args: Prisma.ReservationFindManyArgs
  ): Promise<Reservation[]> {
    return this.prisma.user
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .reservations(args);
  }
  async findUserCondos(
    parentId: number,
    args: Prisma.UserCondoFindManyArgs
  ): Promise<UserCondo[]> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .userCondos(args);
  }
}
