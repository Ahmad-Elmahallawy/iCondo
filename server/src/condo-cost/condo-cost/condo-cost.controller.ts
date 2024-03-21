import {Body, Controller, Get, Post} from '@nestjs/common';
import {CondoCostService} from "./condo-cost.service";
import {Cost} from "@prisma/client";
import * as common from "@nestjs/common";
import * as errors from "../../errors";
import {CostFindManyArgs} from "../../cost/base/CostFindManyArgs";

@Controller('condo-cost')
export class CondoCostController {
    constructor(private readonly condoCostService: CondoCostService) {}

    @Post()
    calculateCost(@Body() body: { squareFeet: number; costPerSqft: number; nbParkingSpots: number; costPerParkingSpot: number }): { totalCost: number } {
        const { squareFeet, costPerSqft, nbParkingSpots, costPerParkingSpot } = body;
        const totalCost = this.condoCostService.calculateCost(squareFeet, costPerSqft, nbParkingSpots, costPerParkingSpot);
        return { totalCost };
    }

    @Get()
    async Costs(
        @common.Param() params: CostFindManyArgs
    ): Promise<Cost[]> {
        const result = await this.condoCostService.getCosts({});
        if (result === null) {
            throw new errors.NotFoundException(
                `No resource was found for ${JSON.stringify(params)}`
            );
        }
        return result;
    }
    
}
