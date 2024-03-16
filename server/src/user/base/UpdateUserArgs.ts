import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UserUpdateInput } from "./UserUpdateInput";

@ArgsType()
class UpdateUserArgs {
  @ApiProperty({
    required: true,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @Field(() => UserWhereUniqueInput, { nullable: false })
  where!: UserWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => UserUpdateInput,
  })
  @ValidateNested()
  @Type(() => UserUpdateInput)
  @Field(() => UserUpdateInput, { nullable: false })
  data!: UserUpdateInput;
}

export { UpdateUserArgs as UpdateUserArgs };
