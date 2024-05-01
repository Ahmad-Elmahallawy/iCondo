import { InputType, Field } from "@nestjs/graphql";
import { CompanyEmployeeWhereUniqueInput } from "../../companyEmployee/base/CompanyEmployeeWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CompanyEmployeeCreateNestedManyWithoutCompaniesInput {
  @Field(() => [CompanyEmployeeWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CompanyEmployeeWhereUniqueInput],
  })
  connect?: Array<CompanyEmployeeWhereUniqueInput>;
}

export { CompanyEmployeeCreateNestedManyWithoutCompaniesInput as CompanyEmployeeCreateNestedManyWithoutCompaniesInput };
