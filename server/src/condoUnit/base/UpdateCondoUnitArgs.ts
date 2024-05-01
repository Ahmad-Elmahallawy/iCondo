import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereUniqueInput } from "./CondoUnitWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CondoUnitUpdateInput } from "./CondoUnitUpdateInput";

@ArgsType()
class UpdateCondoUnitArgs {
  @ApiProperty({
    required: true,
    type: () => CondoUnitWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereUniqueInput)
  @Field(() => CondoUnitWhereUniqueInput, { nullable: false })
  where!: CondoUnitWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CondoUnitUpdateInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitUpdateInput)
  @Field(() => CondoUnitUpdateInput, { nullable: false })
  data!: CondoUnitUpdateInput;
}

export { UpdateCondoUnitArgs as UpdateCondoUnitArgs };
