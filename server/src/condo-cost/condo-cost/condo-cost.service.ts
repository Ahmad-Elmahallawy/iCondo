import { Injectable } from '@nestjs/common';
//import {Cost, Prisma} from "@prisma/client";
// @ts-ignore
import {
    Prisma, // @ts-ignore
    Cost, // @ts-ignore
} from "@prisma/client";
import {PrismaService} from "../../prisma/prisma.service";
@Injectable()
export class CondoCostService {

    constructor(protected readonly prisma: PrismaService) {}

    calculateCost(squareFeet: number, costPerSqft: number, nbParkingSpots: number, costPerParkingSpot: number ): number {
        return squareFeet * costPerSqft + nbParkingSpots * costPerParkingSpot;
    }

    async getCosts<T extends Prisma.CostFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.CostFindManyArgs>
    ): Promise<Cost[]> {
        return this.prisma.cost.findMany(args);
    }
    // async getCost<T extends Prisma.ParkingSpotFindUniqueArgs>(
    //     args: Prisma.SelectSubset<T, Prisma.ParkingSpotFindUniqueArgs>
    // ): Promise<Cost | null> {
    //     return this.prisma.cost.findUnique(args);
    // }


}
