import {Inject, Injectable, Logger} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KafkaMessage } from "./KafkaMessage";
import { MyMessageBrokerTopics } from "./topics";

@Injectable()
export class KafkaProducerService {
  constructor(@Inject("KAFKA_CLIENT") private kafkaClient: ClientKafka) {}
  private readonly logger = new Logger(KafkaProducerService.name);
  async emitMessage(
    topic: MyMessageBrokerTopics,
    message: KafkaMessage
  ): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.kafkaClient.emit(topic, message).subscribe({
        error: (err: Error) => {
          this.logger.log(err)
          reject(err);
        },
        next: () => {
          this.logger.log('resolving?')
          resolve();
        },
      });
    });
  }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

}
