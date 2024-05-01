import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationKeyWhereUniqueInput } from "./RegistrationKeyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { RegistrationKeyUpdateInput } from "./RegistrationKeyUpdateInput";

@ArgsType()
class UpdateRegistrationKeyArgs {
  @ApiProperty({
    required: true,
    type: () => RegistrationKeyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyWhereUniqueInput)
  @Field(() => RegistrationKeyWhereUniqueInput, { nullable: false })
  where!: RegistrationKeyWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => RegistrationKeyUpdateInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyUpdateInput)
  @Field(() => RegistrationKeyUpdateInput, { nullable: false })
  data!: RegistrationKeyUpdateInput;
}

export { UpdateRegistrationKeyArgs as UpdateRegistrationKeyArgs };
