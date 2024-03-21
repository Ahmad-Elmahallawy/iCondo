import {Body, Controller, Get, Post} from '@nestjs/common';
import {CondoCostService} from "./condo-cost.service";
import {Cost} from "@prisma/client";
import * as common from "@nestjs/common";
import * as errors from "../../errors";
import {CostFindManyArgs} from "../../cost/base/CostFindManyArgs";
import {CompanyWhereUniqueInput} from "../../company/base/CompanyWhereUniqueInput";
import {Request} from "express";
import {plainToClass} from "class-transformer";

@Controller('condo-cost')
export class CondoCostController {
    constructor(private readonly condoCostService: CondoCostService) {}

    @Post()
    calculateCost(@Body() body: { squareFeet: number; costPerSqft: number; nbParkingSpots: number; costPerParkingSpot: number }): { totalCost: number } {
        const { squareFeet, costPerSqft, nbParkingSpots, costPerParkingSpot } = body;
        const totalCost = this.condoCostService.calculateCost(squareFeet, costPerSqft, nbParkingSpots, costPerParkingSpot);
        return { totalCost };

    }

    @Get("/:id")
    async findCosts(
        @common.Req() request: Request,
        @common.Param() params: CompanyWhereUniqueInput
    ): Promise<Cost[]> {
        const query = plainToClass(CostFindManyArgs, request.query);
        const results = await this.condoCostService.findCosts(params.id, {
            ...query,
            select: {
                amount: true,

                company: {
                    select: {
                        id: true,
                    },
                },

                costName: true,
                createdAt: true,
                id: true,
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
    
}
