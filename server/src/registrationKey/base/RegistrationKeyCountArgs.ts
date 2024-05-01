import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationKeyWhereInput } from "./RegistrationKeyWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class RegistrationKeyCountArgs {
  @ApiProperty({
    required: false,
    type: () => RegistrationKeyWhereInput,
  })
  @Field(() => RegistrationKeyWhereInput, { nullable: true })
  @Type(() => RegistrationKeyWhereInput)
  where?: RegistrationKeyWhereInput;
}

export { RegistrationKeyCountArgs as RegistrationKeyCountArgs };
