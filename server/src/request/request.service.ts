import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RequestServiceBase } from "./base/request.service.base";
import {KafkaProducerService} from "../kafka/kafka.producer.service";
@Injectable()
export class RequestService extends RequestServiceBase {
  constructor(protected readonly prisma: PrismaService, protected readonly kafkaProducer: KafkaProducerService) {
    super(prisma, kafkaProducer);
  }
}
