import {Body, Controller, Post} from '@nestjs/common';
import {CondoCostService} from "./condo-cost.service";

@Controller('condo-cost')
export class CondoCostController {
    constructor(private readonly condoCostService: CondoCostService) {}

    @Post()
    calculateCost(@Body() body: { squareFeet: number; costPerSqft: number; nbParkingSpots: number; costPerParkingSpot: number }): { totalCost: number } {
        const { squareFeet, costPerSqft, nbParkingSpots, costPerParkingSpot } = body;
        const totalCost = this.condoCostService.calculateCost(squareFeet, costPerSqft, nbParkingSpots, costPerParkingSpot);
        return { totalCost };
    }

    
}
