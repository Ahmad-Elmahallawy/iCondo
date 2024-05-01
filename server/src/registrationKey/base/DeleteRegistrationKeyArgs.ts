import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationKeyWhereUniqueInput } from "./RegistrationKeyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class DeleteRegistrationKeyArgs {
  @ApiProperty({
    required: true,
    type: () => RegistrationKeyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyWhereUniqueInput)
  @Field(() => RegistrationKeyWhereUniqueInput, { nullable: false })
  where!: RegistrationKeyWhereUniqueInput;
}

export { DeleteRegistrationKeyArgs as DeleteRegistrationKeyArgs };
