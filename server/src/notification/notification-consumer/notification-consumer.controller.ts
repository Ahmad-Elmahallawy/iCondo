import {Controller, Logger} from '@nestjs/common';
import {EventPattern, Payload} from "@nestjs/microservices";
import {KafkaMessage} from "../../kafka/KafkaMessage";
import {NotificationService} from "../notification.service";

@Controller('notification-consumer')
export class NotificationConsumerController {
    private readonly logger = new Logger(NotificationConsumerController.name);

    constructor(private notificationService: NotificationService) {
    }

    @EventPattern("request.status")

    async onRequestStatus(@Payload() message: any) {
        { // Use Message type
            try {
                // Pass the extracted data to createNotification
                if(message.status==="CREATED")
                await this.notificationService.createNotification({
                    data: {
                        createdAt: message.createdAt,
                        id: message.id,
                        message: JSON.stringify(message),
                        title: message.status,
                        updatedAt: message.updatedAt,
                    },
                    select: {
                        createdAt: true,
                        id: true,
                        message: true,
                        title: true,
                        updatedAt: true,
                    },
                });

                else await this.notificationService.updateNotification({
                    where:{id:message.id},
                    data: {
                        createdAt: message.createdAt,
                        id: message.id,
                        message: JSON.stringify(message),
                        title: message.status,
                        updatedAt: message.updatedAt,
                    },
                    select: {
                        createdAt: true,
                        id: true,
                        message: true,
                        title: true,
                        updatedAt: true,
                    },
                })

                // this.logger.log(`Received message from topic ${topic}: ${message?.value?.toString() ?? ''}`);
            } catch (error) {
                this.logger.error(`Error creating notification: ${error}`);
            }
        }
    }
}
