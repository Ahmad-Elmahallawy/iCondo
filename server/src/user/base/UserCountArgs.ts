import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserWhereInput } from "./UserWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class UserCountArgs {
  @ApiProperty({
    required: false,
    type: () => UserWhereInput,
  })
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}

export { UserCountArgs as UserCountArgs };
