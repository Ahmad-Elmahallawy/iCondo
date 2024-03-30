import { InputType, Field } from "@nestjs/graphql";
import { CostWhereUniqueInput } from "../../cost/base/CostWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CostCreateNestedManyWithoutCompaniesInput {
  @Field(() => [CostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CostWhereUniqueInput],
  })
  connect?: Array<CostWhereUniqueInput>;
}

export { CostCreateNestedManyWithoutCompaniesInput as CostCreateNestedManyWithoutCompaniesInput };
