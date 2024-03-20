import { Injectable, Logger } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { MyMessageBrokerTopics } from "./topics";
import { NotificationService } from "../notification/notification.service";
import { Message } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
    private readonly logger = new Logger(KafkaConsumerService.name);

    constructor(
        private kafkaClient: ClientKafka,
        private notificationService: NotificationService,
    ) {}

    async consumeFromTopic(topic: MyMessageBrokerTopics): Promise<void> {
        try {
            await this.kafkaClient.connect(); // Ensure the client is connected

            this.kafkaClient.subscribeToResponseOf(topic); // Subscribe to the response topic
            await this.kafkaClient.send({ topic }, {}).toPromise(); // Send an empty message to trigger consumption

            // Get the consumer instance from ClientKafka
            const consumer:any = this.kafkaClient['consumer'];

            consumer.subscribe({
                topic: topic,
                fromBeginning: true, // Optional: Start consuming from the beginning of the topic
            });

            consumer.run({
                eachMessage: async ({ message }: { message: Message }) => { // Use Message type
                    const notificationData = JSON.parse(message?.value?.toString() ?? ''); // Assuming your message contains JSON data

                    try {
                        // Pass the extracted data to createNotification
                        await this.notificationService.createNotification({
                            data: {
                                createdAt: notificationData.createdAt,
                                id: notificationData.id,
                                message: notificationData.message,
                                title: notificationData.title,
                                updatedAt: notificationData.updatedAt,
                            },
                            select: {
                                createdAt: true,
                                id: true,
                                message: true,
                                title: true,
                                updatedAt: true,
                            },
                        });

                        this.logger.log(`Received message from topic ${topic}: ${message?.value?.toString() ?? ''}`);
                    } catch (error) {
                        this.logger.error(`Error creating notification: ${error}`);
                    }
                },
            });
        } catch (error) {
            this.logger.error(`Error subscribing to topic ${topic}: ${error}`);
        }
    }
}
