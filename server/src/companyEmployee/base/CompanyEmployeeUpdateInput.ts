import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { RequestUpdateManyWithoutCompanyEmployeesInput } from "./RequestUpdateManyWithoutCompanyEmployeesInput";
@InputType()
class CompanyEmployeeUpdateInput {
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
    type: () => RequestUpdateManyWithoutCompanyEmployeesInput,
  })
  @ValidateNested()
  @Type(() => RequestUpdateManyWithoutCompanyEmployeesInput)
  @IsOptional()
  @Field(() => RequestUpdateManyWithoutCompanyEmployeesInput, {
    nullable: true,
  })
  requests?: RequestUpdateManyWithoutCompanyEmployeesInput;

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
}

export { CompanyEmployeeUpdateInput as CompanyEmployeeUpdateInput };
