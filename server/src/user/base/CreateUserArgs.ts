import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserCreateInput } from "./UserCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateUserArgs {
  @ApiProperty({
    required: true,
    type: () => UserCreateInput,
  })
  @ValidateNested()
  @Type(() => UserCreateInput)
  @Field(() => UserCreateInput, { nullable: false })
  data!: UserCreateInput;
}

export { CreateUserArgs as CreateUserArgs };
