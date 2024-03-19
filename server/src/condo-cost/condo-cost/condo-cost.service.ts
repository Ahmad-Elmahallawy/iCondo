import { Injectable } from '@nestjs/common';

@Injectable()
export class CondoCostService {
    calculateCost(squareFeet: number, costPerSqft: number): number {
        return squareFeet * costPerSqft;
    }
}
