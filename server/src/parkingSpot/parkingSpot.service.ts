import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ParkingSpotServiceBase } from "./base/parkingSpot.service.base";

@Injectable()
export class ParkingSpotService extends ParkingSpotServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
