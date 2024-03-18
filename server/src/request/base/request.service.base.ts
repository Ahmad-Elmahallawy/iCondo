import {PrismaService} from "../../prisma/prisma.service";

import {Company, Prisma, Request, User,} from "@prisma/client";
import {KafkaProducerService} from "../../kafka/kafka.producer.service";
import {MyMessageBrokerTopics} from "../../kafka/topics";
import {KafkaMessage} from "../../kafka/KafkaMessage";


export class RequestServiceBase {
  constructor(protected readonly prisma: PrismaService, protected readonly kafkaProducer: KafkaProducerService) {}

  async count<T extends Prisma.RequestCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.RequestCountArgs>
  ): Promise<number> {
    return this.prisma.request.count(args);
  }

  async requests<T extends Prisma.RequestFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RequestFindManyArgs>
  ): Promise<Request[]> {
    return this.prisma.request.findMany(args);
  }
  async request<T extends Prisma.RequestFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RequestFindUniqueArgs>
  ): Promise<Request | null> {
    return this.prisma.request.findUnique(args);
  }
  async createRequest<T extends Prisma.RequestCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RequestCreateArgs>
  ): Promise<Request> {
    const request = await this.prisma.request.create<T>(args);


        console.log(request.userID)
        console.log(request)
        const msg: KafkaMessage = {
            key: null,
            value: {
                "userID":request.userID,
                "id": request.id,
                "status": 'CREATED'
            }
        }
        await this.kafkaProducer.emitMessage(MyMessageBrokerTopics.RequestStatus, msg)
        console.log('Message pushed to Topic')
        return request;
    }

    async updateRequest<T extends Prisma.RequestUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.RequestUpdateArgs>
    ): Promise<Request> {
        return this.prisma.request.update<T>(args);
    }

    async deleteRequest<T extends Prisma.RequestDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.RequestDeleteArgs>
    ): Promise<Request> {
        return this.prisma.request.delete(args);
    }

  async getCompany(parentId: string): Promise<Company | null> {
    return this.prisma.request
      .findUnique({
        where: { id: parentId },
      })
      .company();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.request
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
