import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CostWhereInput } from "./CostWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class CostCountArgs {
  @ApiProperty({
    required: false,
    type: () => CostWhereInput,
  })
  @Field(() => CostWhereInput, { nullable: true })
  @Type(() => CostWhereInput)
  where?: CostWhereInput;
}

export { CostCountArgs as CostCountArgs };
