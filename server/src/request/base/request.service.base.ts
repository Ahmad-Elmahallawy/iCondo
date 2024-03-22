import {PrismaService} from "../../prisma/prisma.service";

import {
    Prisma,
    Request, // @ts-ignore
    Company, // @ts-ignore
    CondoUnit, // @ts-ignore
    CompanyEmployee, // @ts-ignore
    Property, // @ts-ignore
    Notification, // @ts-ignore
    User,
} from "@prisma/client";
import {KafkaProducerService} from "../../kafka/kafka.producer.service";
import {MyMessageBrokerTopics} from "../../kafka/topics";
import {KafkaMessage} from "../../kafka/KafkaMessage";


export class RequestServiceBase {
    constructor(protected readonly prisma: PrismaService, protected readonly kafkaProducer: KafkaProducerService) {
    }

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

    async getCondoUnit(parentId: string): Promise<CondoUnit | null> {
        return this.prisma.request
            .findUnique({
                where: {id: parentId},
            })
            .condoUnit();
    }

    async getEmployee(parentId: string): Promise<CompanyEmployee | null> {
        return this.prisma.request
            .findUnique({
                where: {id: parentId},
            })
            .employee();
    }

    async getProperty(parentId: string): Promise<Property | null> {
        return this.prisma.request
            .findUnique({
                where: {id: parentId},
            })
            .property();
    }

    async request<T extends Prisma.RequestFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.RequestFindUniqueArgs>
    ): Promise<Request | null> {
        return this.prisma.request.findUnique(args);
    }

    async findNotifications(
        parentId: string,
        args: Prisma.NotificationFindManyArgs
    ): Promise<Notification[]> {
        return this.prisma.request
            .findUniqueOrThrow({
                where: { id: parentId },
            })
            .notifications(args);
    }

    async createRequest<T extends Prisma.RequestCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.RequestCreateArgs>
    ): Promise<Request> {
        const request: any = await this.prisma.request.create<T>(args);
        request.status = "CREATED"


        const msg: KafkaMessage = {
            key: null,
            value: request
        }
        await this.kafkaProducer.emitMessage(MyMessageBrokerTopics.RequestStatus, msg)
        return request;
    }

    async updateRequest<T extends Prisma.RequestUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.RequestUpdateArgs>
    ): Promise<Request> {
        const request = await this.prisma.request.update<T>(args);
        const msg: KafkaMessage = {
            key: null,
            value: request
        }
        await this.kafkaProducer.emitMessage(MyMessageBrokerTopics.RequestStatus, msg)
        return request
    }

    async deleteRequest<T extends Prisma.RequestDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.RequestDeleteArgs>
    ): Promise<Request> {
        return this.prisma.request.delete(args);
    }

    async getCompany(parentId: string): Promise<Company | null> {
        return this.prisma.request
            .findUnique({
                where: {id: parentId},
            })
            .company();
    }

    async getUser(parentId: string): Promise<User | null> {
        return this.prisma.request
            .findUnique({
                where: {id: parentId},
            })
            .user();
    }
}
