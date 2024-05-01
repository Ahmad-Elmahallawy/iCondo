import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationWhereUniqueInput } from "./NotificationWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { NotificationUpdateInput } from "./NotificationUpdateInput";

@ArgsType()
class UpdateNotificationArgs {
  @ApiProperty({
    required: true,
    type: () => NotificationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => NotificationWhereUniqueInput)
  @Field(() => NotificationWhereUniqueInput, { nullable: false })
  where!: NotificationWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => NotificationUpdateInput,
  })
  @ValidateNested()
  @Type(() => NotificationUpdateInput)
  @Field(() => NotificationUpdateInput, { nullable: false })
  data!: NotificationUpdateInput;
}

export { UpdateNotificationArgs as UpdateNotificationArgs };
