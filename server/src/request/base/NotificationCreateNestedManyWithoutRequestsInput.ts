import { InputType, Field } from "@nestjs/graphql";
import { NotificationWhereUniqueInput } from "../../notification/base/NotificationWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class NotificationCreateNestedManyWithoutRequestsInput {
  @Field(() => [NotificationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [NotificationWhereUniqueInput],
  })
  connect?: Array<NotificationWhereUniqueInput>;
}

export { NotificationCreateNestedManyWithoutRequestsInput as NotificationCreateNestedManyWithoutRequestsInput };
