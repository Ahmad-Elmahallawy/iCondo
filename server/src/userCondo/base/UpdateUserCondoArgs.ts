import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserCondoWhereUniqueInput } from "./UserCondoWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UserCondoUpdateInput } from "./UserCondoUpdateInput";

@ArgsType()
class UpdateUserCondoArgs {
  @ApiProperty({
    required: true,
    type: () => UserCondoWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserCondoWhereUniqueInput)
  @Field(() => UserCondoWhereUniqueInput, { nullable: false })
  where!: UserCondoWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => UserCondoUpdateInput,
  })
  @ValidateNested()
  @Type(() => UserCondoUpdateInput)
  @Field(() => UserCondoUpdateInput, { nullable: false })
  data!: UserCondoUpdateInput;
}

export { UpdateUserCondoArgs as UpdateUserCondoArgs };
