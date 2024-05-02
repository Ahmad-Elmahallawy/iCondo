import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PropertyCreateInput } from "./PropertyCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreatePropertyArgs {
  @ApiProperty({
    required: true,
    type: () => PropertyCreateInput,
  })
  @ValidateNested()
  @Type(() => PropertyCreateInput)
  @Field(() => PropertyCreateInput, { nullable: false })
  data!: PropertyCreateInput;
}

export { CreatePropertyArgs as CreatePropertyArgs };
