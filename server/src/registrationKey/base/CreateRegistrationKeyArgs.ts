import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationKeyCreateInput } from "./RegistrationKeyCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateRegistrationKeyArgs {
  @ApiProperty({
    required: true,
    type: () => RegistrationKeyCreateInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyCreateInput)
  @Field(() => RegistrationKeyCreateInput, { nullable: false })
  data!: RegistrationKeyCreateInput;
}

export { CreateRegistrationKeyArgs as CreateRegistrationKeyArgs };
