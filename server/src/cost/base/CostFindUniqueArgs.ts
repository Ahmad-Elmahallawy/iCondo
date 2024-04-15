import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CostWhereUniqueInput } from "./CostWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CostFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => CostWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CostWhereUniqueInput)
  @Field(() => CostWhereUniqueInput, { nullable: false })
  where!: CostWhereUniqueInput;
}

export { CostFindUniqueArgs as CostFindUniqueArgs };
