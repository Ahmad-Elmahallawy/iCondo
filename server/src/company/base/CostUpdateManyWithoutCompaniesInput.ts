import { InputType, Field } from "@nestjs/graphql";
import { CostWhereUniqueInput } from "../../cost/base/CostWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CostUpdateManyWithoutCompaniesInput {
  @Field(() => [CostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CostWhereUniqueInput],
  })
  connect?: Array<CostWhereUniqueInput>;

  @Field(() => [CostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CostWhereUniqueInput],
  })
  disconnect?: Array<CostWhereUniqueInput>;

  @Field(() => [CostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CostWhereUniqueInput],
  })
  set?: Array<CostWhereUniqueInput>;
}

export { CostUpdateManyWithoutCompaniesInput as CostUpdateManyWithoutCompaniesInput };
