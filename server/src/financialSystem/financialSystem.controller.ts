import {Controller, Get, Post} from '@nestjs/common';
import {FinancialSystemService} from "./financialSystem.service";
import {Cost} from "@prisma/client";
import * as common from "@nestjs/common";
import * as errors from "../errors";
import {CostFindManyArgs} from "../cost/base/CostFindManyArgs";
import {CompanyWhereUniqueInput} from "../company/base/CompanyWhereUniqueInput";
import {Request} from "express";
import {plainToClass} from "class-transformer";

@Controller('financialSystem')
export class FinancialSystemController {
    constructor(private readonly financialSystemService: FinancialSystemService) {
    }

    @Post("/:id")
    async calculateCost(
        @common.Req() request: Request,
        @common.Param() params: CompanyWhereUniqueInput
    ): Promise<{ condoList: any, collectedCondoFees: number }> {

        let result = {condoList: Array<{ name: string, condoFee: number }>(), collectedCondoFees: 0};
        let collectedCondoFees = 0;

        const properties = await this.financialSystemService.findProperties(params.id, {
            select: {
                id: true,
                name: true,
            },
        });
        if (properties.length === null) {
            throw new errors.NotFoundException(
                `No resource was found for ${JSON.stringify(params)}`
            );
        }

        for (let i = 0; i < properties.length; i++) {

            const condoUnits = await this.financialSystemService.findCondoUnits(properties[i].id, {
                select: {
                    condoFee: true,
                    parkingSpot: true,
                    size: true,
                    unitNumber: true,
                },
            });

            for (let j = 0; j < condoUnits.length; j++) {
                let price = condoUnits[j].condoFee ?? "10"; // Yes, default value is 10. Deal with it (with love from the backend team)
                price = price.toString();
                //@ts-ignore
                const condoFee = this.calculateCostPerUnit(parseInt(condoUnits[j].size), parseFloat(price), condoUnits[j].parkingSpot.length, parseFloat(price));
                result.condoList.push({
                    name: properties[i].name + " - Condo " + condoUnits[j].unitNumber,
                    condoFee
                });
                collectedCondoFees = collectedCondoFees + condoFee;
            }

        }
        result.collectedCondoFees = collectedCondoFees;
        return result;
    }

    private calculateCostPerUnit(squareFeet: number, costPerSqft: number, nbParkingSpots: number, costPerParkingSpot: number): number {
        const condoFee = squareFeet * costPerSqft + nbParkingSpots * costPerParkingSpot;
        return condoFee;
    }

    @Get("/:id")
    async findCosts(
        @common.Req() request: Request,
        @common.Param() params: CompanyWhereUniqueInput
    ): Promise<{ costList: Cost[], totalExpenses: number }> {

        let result = {costList: Array<Cost>(), totalExpenses: 0};
        let totalExpenses = 0;
        const query = plainToClass(CostFindManyArgs, request.query);
        const costs = await this.financialSystemService.findCosts(params.id, {
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
        if (costs === null) {
            throw new errors.NotFoundException(
                `No resource was found for ${JSON.stringify(params)}`
            );
        }
        for (let i = 0; i < costs.length; i++) {
            let price = costs[i].amount ?? "1000"; // Yes, default value is 1000. Deal with it (with love from the backend team)
            price = price.toString();
            totalExpenses = totalExpenses + parseFloat(price);
        }
        result.costList = costs;
        result.totalExpenses = totalExpenses;
        return result;
    }

}
