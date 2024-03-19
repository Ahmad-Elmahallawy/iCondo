import { Controller } from '@nestjs/common';
import {EventPattern, Payload} from "@nestjs/microservices";
import {KafkaMessage} from "../../kafka/KafkaMessage";

@Controller('notification-consumer')
export class NotificationConsumerController {

    @EventPattern("request.status")

    async onRequestStatus(@Payload() message: KafkaMessage){
        console.log('MESSAGE INSIDE ANOTHER MICROSERVICE!!!!!')
        console.log(message)
    }
}
