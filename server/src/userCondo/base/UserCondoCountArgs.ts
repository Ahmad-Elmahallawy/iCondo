import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserCondoWhereInput } from "./UserCondoWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class UserCondoCountArgs {
  @ApiProperty({
    required: false,
    type: () => UserCondoWhereInput,
  })
  @Field(() => UserCondoWhereInput, { nullable: true })
  @Type(() => UserCondoWhereInput)
  where?: UserCondoWhereInput;
}

export { UserCondoCountArgs as UserCondoCountArgs };
