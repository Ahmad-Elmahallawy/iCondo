import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationCreateInput } from "./NotificationCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateNotificationArgs {
  @ApiProperty({
    required: true,
    type: () => NotificationCreateInput,
  })
  @ValidateNested()
  @Type(() => NotificationCreateInput)
  @Field(() => NotificationCreateInput, { nullable: false })
  data!: NotificationCreateInput;
}

export { CreateNotificationArgs as CreateNotificationArgs };
