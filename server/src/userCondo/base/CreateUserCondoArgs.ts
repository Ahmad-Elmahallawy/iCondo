import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserCondoCreateInput } from "./UserCondoCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateUserCondoArgs {
  @ApiProperty({
    required: true,
    type: () => UserCondoCreateInput,
  })
  @ValidateNested()
  @Type(() => UserCondoCreateInput)
  @Field(() => UserCondoCreateInput, { nullable: false })
  data!: UserCondoCreateInput;
}

export { CreateUserCondoArgs as CreateUserCondoArgs };
