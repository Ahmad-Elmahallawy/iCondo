import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeListRelationFilter } from "../../companyEmployee/base/CompanyEmployeeListRelationFilter";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { CostListRelationFilter } from "../../cost/base/CostListRelationFilter";
import { FileListRelationFilter } from "../../file/base/FileListRelationFilter";
import { IntFilter } from "../../util/IntFilter";
import { StringFilter } from "../../util/StringFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { PropertyListRelationFilter } from "../../property/base/PropertyListRelationFilter";
import { RequestListRelationFilter } from "../../request/base/RequestListRelationFilter";
@InputType()
class CompanyWhereInput {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeListRelationFilter,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeListRelationFilter)
  @IsOptional()
  @Field(() => CompanyEmployeeListRelationFilter, {
    nullable: true,
  })
  companyEmployees?: CompanyEmployeeListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => CostListRelationFilter,
  })
  @ValidateNested()
  @Type(() => CostListRelationFilter)
  @IsOptional()
  @Field(() => CostListRelationFilter, {
    nullable: true,
  })
  costs?: CostListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => FileListRelationFilter,
  })
  @ValidateNested()
  @Type(() => FileListRelationFilter)
  @IsOptional()
  @Field(() => FileListRelationFilter, {
    nullable: true,
  })
  file?: FileListRelationFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  id?: IntFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  name?: StringFilter;

  @ApiProperty({
    required: false,
    type: DateTimeNullableFilter,
  })
  @Type(() => DateTimeNullableFilter)
  @IsOptional()
  @Field(() => DateTimeNullableFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeNullableFilter;

  @ApiProperty({
    required: false,
    type: () => PropertyListRelationFilter,
  })
  @ValidateNested()
  @Type(() => PropertyListRelationFilter)
  @IsOptional()
  @Field(() => PropertyListRelationFilter, {
    nullable: true,
  })
  properties?: PropertyListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => RequestListRelationFilter,
  })
  @ValidateNested()
  @Type(() => RequestListRelationFilter)
  @IsOptional()
  @Field(() => RequestListRelationFilter, {
    nullable: true,
  })
  requests?: RequestListRelationFilter;
}

export { CompanyWhereInput as CompanyWhereInput };
