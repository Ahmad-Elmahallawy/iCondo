import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CostWhereUniqueInput } from "./CostWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CostUpdateInput } from "./CostUpdateInput";

@ArgsType()
class UpdateCostArgs {
  @ApiProperty({
    required: true,
    type: () => CostWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CostWhereUniqueInput)
  @Field(() => CostWhereUniqueInput, { nullable: false })
  where!: CostWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CostUpdateInput,
  })
  @ValidateNested()
  @Type(() => CostUpdateInput)
  @Field(() => CostUpdateInput, { nullable: false })
  data!: CostUpdateInput;
}

export { UpdateCostArgs as UpdateCostArgs };
