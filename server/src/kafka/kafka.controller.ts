import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { KafkaMessage } from "./KafkaMessage";
/*
@Controller("kafka-controller")
export class KafkaController {
  @EventPattern("request.status")
  async onRequestStatus(
      @Payload()
          message:KafkaMessage
   ): Promise<void> {

    console.log(message);
  }
}*/
