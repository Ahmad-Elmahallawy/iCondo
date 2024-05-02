import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitCreateInput } from "./CondoUnitCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateCondoUnitArgs {
  @ApiProperty({
    required: true,
    type: () => CondoUnitCreateInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitCreateInput)
  @Field(() => CondoUnitCreateInput, { nullable: false })
  data!: CondoUnitCreateInput;
}

export { CreateCondoUnitArgs as CreateCondoUnitArgs };
