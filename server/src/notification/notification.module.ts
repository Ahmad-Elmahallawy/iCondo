import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { NotificationModuleBase } from "./base/notification.module.base";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { NotificationGrpcController } from "./notification.grpc.controller";
import { NotificationResolver } from "./notification.resolver";
import { SocketGateway } from './socket/socket.gateway';
import { NotificationConsumerController } from './notification-consumer/notification-consumer.controller';

@Module({
  imports: [NotificationModuleBase, forwardRef(() => AuthModule)],
  controllers: [NotificationController, NotificationGrpcController, NotificationConsumerController],
  providers: [NotificationService, NotificationResolver, SocketGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
