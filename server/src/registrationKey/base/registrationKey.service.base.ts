import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  RegistrationKey, // @ts-ignore
  CondoUnit,
} from "@prisma/client";

export class RegistrationKeyServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.RegistrationKeyCountArgs>(
      args: Prisma.SelectSubset<T, Prisma.RegistrationKeyCountArgs>
  ): Promise<number> {
    return this.prisma.registrationKey.count(args);
  }

  async registrationKeys<T extends Prisma.RegistrationKeyFindManyArgs>(
      args: Prisma.SelectSubset<T, Prisma.RegistrationKeyFindManyArgs>
  ): Promise<RegistrationKey[]> {
    return this.prisma.registrationKey.findMany(args);
  }
  async registrationKey<T extends Prisma.RegistrationKeyFindUniqueArgs>(
      args: Prisma.SelectSubset<T, Prisma.RegistrationKeyFindUniqueArgs>
  ): Promise<RegistrationKey | null> {
    return this.prisma.registrationKey.findUnique(args);
  }
  async createRegistrationKey<T extends Prisma.RegistrationKeyCreateArgs>(
      args: Prisma.SelectSubset<T, Prisma.RegistrationKeyCreateArgs>
  ): Promise<RegistrationKey> {
    return this.prisma.registrationKey.create<T>(args);
  }
  async updateRegistrationKey<T extends Prisma.RegistrationKeyUpdateArgs>(
      args: Prisma.SelectSubset<T, Prisma.RegistrationKeyUpdateArgs>
  ): Promise<RegistrationKey> {
    return this.prisma.registrationKey.update<T>(args);
  }
  async deleteRegistrationKey<T extends Prisma.RegistrationKeyDeleteArgs>(
      args: Prisma.SelectSubset<T, Prisma.RegistrationKeyDeleteArgs>
  ): Promise<RegistrationKey> {
    return this.prisma.registrationKey.delete(args);
  }

  async getCondoUnit(parentId: number): Promise<CondoUnit | null> {
    return this.prisma.registrationKey
        .findUnique({
          where: { id: parentId },
        })
        .condoUnit();
  }
}