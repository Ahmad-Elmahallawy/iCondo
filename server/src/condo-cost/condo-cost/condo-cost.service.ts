import { Injectable } from '@nestjs/common';

@Injectable()
export class CondoCostService {
    calculateCost(squareFeet: number, costPerSqft: number, nbParkingSpots: number, costPerParkingSpot: number ): number {
        return squareFeet * costPerSqft + nbParkingSpots * costPerParkingSpot;
    }
}
