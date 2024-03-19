import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { RequestCreateNestedManyWithoutCompanyEmployeesInput } from "./RequestCreateNestedManyWithoutCompanyEmployeesInput";
@InputType()
class CompanyEmployeeCreateInput {
  @ApiProperty({
    required: false,
    type: () => CompanyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereUniqueInput)
  @IsOptional()
  @Field(() => CompanyWhereUniqueInput, {
    nullable: true,
  })
  company?: CompanyWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  user?: UserWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: () => RequestCreateNestedManyWithoutCompanyEmployeesInput,
  })
  @ValidateNested()
  @Type(() => RequestCreateNestedManyWithoutCompanyEmployeesInput)
  @IsOptional()
  @Field(() => RequestCreateNestedManyWithoutCompanyEmployeesInput, {
    nullable: true,
  })
  requests?: RequestCreateNestedManyWithoutCompanyEmployeesInput;
}

export { CompanyEmployeeCreateInput as CompanyEmployeeCreateInput };
