import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeCreateNestedManyWithoutCompaniesInput } from "./CompanyEmployeeCreateNestedManyWithoutCompaniesInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { CostCreateNestedManyWithoutCompaniesInput } from "./CostCreateNestedManyWithoutCompaniesInput";
import { FileCreateNestedManyWithoutCompaniesInput } from "./FileCreateNestedManyWithoutCompaniesInput";
import { PropertyCreateNestedManyWithoutCompaniesInput } from "./PropertyCreateNestedManyWithoutCompaniesInput";
import { RequestCreateNestedManyWithoutCompaniesInput } from "./RequestCreateNestedManyWithoutCompaniesInput";
@InputType()
class CompanyCreateInput {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeCreateNestedManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeCreateNestedManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => CompanyEmployeeCreateNestedManyWithoutCompaniesInput, {
    nullable: true,
  })
  companyEmployees?: CompanyEmployeeCreateNestedManyWithoutCompaniesInput;

  @ApiProperty({
    required: false,
    type: () => CostCreateNestedManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => CostCreateNestedManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => CostCreateNestedManyWithoutCompaniesInput, {
    nullable: true,
  })
  costs?: CostCreateNestedManyWithoutCompaniesInput;

  @ApiProperty({
    required: false,
    type: () => FileCreateNestedManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => FileCreateNestedManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => FileCreateNestedManyWithoutCompaniesInput, {
    nullable: true,
  })
  file?: FileCreateNestedManyWithoutCompaniesInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;


  @ApiProperty({
    required: false,
    type: () => PropertyCreateNestedManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => PropertyCreateNestedManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => PropertyCreateNestedManyWithoutCompaniesInput, {
    nullable: true,
  })
  properties?: PropertyCreateNestedManyWithoutCompaniesInput;

  @ApiProperty({
    required: false,
    type: () => RequestCreateNestedManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => RequestCreateNestedManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => RequestCreateNestedManyWithoutCompaniesInput, {
    nullable: true,
  })
  requests?: RequestCreateNestedManyWithoutCompaniesInput;

}

export { CompanyCreateInput as CompanyCreateInput };
