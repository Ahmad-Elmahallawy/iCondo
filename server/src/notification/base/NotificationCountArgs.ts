import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationWhereInput } from "./NotificationWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class NotificationCountArgs {
  @ApiProperty({
    required: false,
    type: () => NotificationWhereInput,
  })
  @Field(() => NotificationWhereInput, { nullable: true })
  @Type(() => NotificationWhereInput)
  where?: NotificationWhereInput;
}

export { NotificationCountArgs as NotificationCountArgs };
