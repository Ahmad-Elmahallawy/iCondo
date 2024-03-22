import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserCondoWhereUniqueInput } from "./UserCondoWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class UserCondoFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => UserCondoWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserCondoWhereUniqueInput)
  @Field(() => UserCondoWhereUniqueInput, { nullable: false })
  where!: UserCondoWhereUniqueInput;
}

export { UserCondoFindUniqueArgs as UserCondoFindUniqueArgs };
