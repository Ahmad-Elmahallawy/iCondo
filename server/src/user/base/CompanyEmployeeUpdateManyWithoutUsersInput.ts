import { InputType, Field } from "@nestjs/graphql";
import { CompanyEmployeeWhereUniqueInput } from "../../companyEmployee/base/CompanyEmployeeWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CompanyEmployeeUpdateManyWithoutUsersInput {
  @Field(() => [CompanyEmployeeWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CompanyEmployeeWhereUniqueInput],
  })
  connect?: Array<CompanyEmployeeWhereUniqueInput>;

  @Field(() => [CompanyEmployeeWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CompanyEmployeeWhereUniqueInput],
  })
  disconnect?: Array<CompanyEmployeeWhereUniqueInput>;

  @Field(() => [CompanyEmployeeWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CompanyEmployeeWhereUniqueInput],
  })
  set?: Array<CompanyEmployeeWhereUniqueInput>;
}

export { CompanyEmployeeUpdateManyWithoutUsersInput as CompanyEmployeeUpdateManyWithoutUsersInput };
