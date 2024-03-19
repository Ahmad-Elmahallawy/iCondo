import { Test, TestingModule } from '@nestjs/testing';
import { NotificationConsumerController } from './notification-consumer.controller';

describe('NotificationConsumerController', () => {
  let controller: NotificationConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationConsumerController],
    }).compile();

    controller = module.get<NotificationConsumerController>(NotificationConsumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
