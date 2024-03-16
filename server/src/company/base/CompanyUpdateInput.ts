import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeUpdateManyWithoutCompaniesInput } from "./CompanyEmployeeUpdateManyWithoutCompaniesInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { FileUpdateManyWithoutCompaniesInput } from "./FileUpdateManyWithoutCompaniesInput";
import { PropertyUpdateManyWithoutCompaniesInput } from "./PropertyUpdateManyWithoutCompaniesInput";
import { RequestUpdateManyWithoutCompaniesInput } from "./RequestUpdateManyWithoutCompaniesInput";
@InputType()
class CompanyUpdateInput {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeUpdateManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeUpdateManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => CompanyEmployeeUpdateManyWithoutCompaniesInput, {
    nullable: true,
  })
  companyEmployees?: CompanyEmployeeUpdateManyWithoutCompaniesInput;

  @ApiProperty({
    required: false,
    type: () => FileUpdateManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => FileUpdateManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => FileUpdateManyWithoutCompaniesInput, {
    nullable: true,
  })
  file?: FileUpdateManyWithoutCompaniesInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;
  
  @ApiProperty({
    required: false,
    type: () => PropertyUpdateManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => PropertyUpdateManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => PropertyUpdateManyWithoutCompaniesInput, {
    nullable: true,
  })
  properties?: PropertyUpdateManyWithoutCompaniesInput;


  @ApiProperty({
    required: false,
    type: () => RequestUpdateManyWithoutCompaniesInput,
  })
  @ValidateNested()
  @Type(() => RequestUpdateManyWithoutCompaniesInput)
  @IsOptional()
  @Field(() => RequestUpdateManyWithoutCompaniesInput, {
    nullable: true,
  })
  requests?: RequestUpdateManyWithoutCompaniesInput;
}

export { CompanyUpdateInput as CompanyUpdateInput };
