import {Injectable} from '@nestjs/common';
import {
    Prisma, // @ts-ignore
    Cost, Property, CondoUnit, // @ts-ignore
} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class FinancialSystemService {

    constructor(protected readonly prisma: PrismaService) {
    }

    async getCosts<T extends Prisma.CostFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.CostFindManyArgs>
    ): Promise<Cost[]> {
        return this.prisma.cost.findMany(args);
    }


    async findCosts(
        parentId: number,
        args: Prisma.CostFindManyArgs
    ): Promise<Cost[]> {
        return this.prisma.company
            .findUniqueOrThrow({
                where: {id: parentId},
            })
            .costs(args);
    }

    async findProperties(
        parentId: number,
        args: Prisma.PropertyFindManyArgs
    ): Promise<Property[]> {
        return this.prisma.company
            .findUniqueOrThrow({
                where: {id: parentId},
            })
            .properties(args);
    }

    async findCondoUnits(
        parentId: number,
        args: Prisma.CondoUnitFindManyArgs
    ): Promise<CondoUnit[]> {
        return this.prisma.property
            .findUniqueOrThrow({
                where: {id: parentId},
            })
            .condoUnits(args);
    }

}
