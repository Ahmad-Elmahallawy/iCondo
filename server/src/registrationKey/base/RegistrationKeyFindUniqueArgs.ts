import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationKeyWhereUniqueInput } from "./RegistrationKeyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class RegistrationKeyFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => RegistrationKeyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyWhereUniqueInput)
  @Field(() => RegistrationKeyWhereUniqueInput, { nullable: false })
  where!: RegistrationKeyWhereUniqueInput;
}

export { RegistrationKeyFindUniqueArgs as RegistrationKeyFindUniqueArgs };
