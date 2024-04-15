import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CostCreateInput } from "./CostCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateCostArgs {
  @ApiProperty({
    required: true,
    type: () => CostCreateInput,
  })
  @ValidateNested()
  @Type(() => CostCreateInput)
  @Field(() => CostCreateInput, { nullable: false })
  data!: CostCreateInput;
}

export { CreateCostArgs as CreateCostArgs };
