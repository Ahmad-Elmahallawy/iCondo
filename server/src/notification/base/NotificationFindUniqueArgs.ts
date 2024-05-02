import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationWhereUniqueInput } from "./NotificationWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class NotificationFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => NotificationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => NotificationWhereUniqueInput)
  @Field(() => NotificationWhereUniqueInput, { nullable: false })
  where!: NotificationWhereUniqueInput;
}

export { NotificationFindUniqueArgs as NotificationFindUniqueArgs };
