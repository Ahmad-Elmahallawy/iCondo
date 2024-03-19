import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Company } from "../../company/base/Company";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
} from "class-validator";
import { EnumRequestStatus } from "./EnumRequestStatus";
import { Type } from "class-transformer";
import { EnumRequestType } from "./EnumRequestType";
import { User } from "../../user/base/User";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { CompanyEmployee } from "../../companyEmployee/base/CompanyEmployee";
import { Property } from "../../property/base/Property";

@ObjectType()
class Request {
  @ApiProperty({
    required: false,
    type: () => Company,
  })
  @ValidateNested()
  @Type(() => Company)
  @IsOptional()
  company?: Company | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    enum: EnumRequestType,
  })
  @IsEnum(EnumRequestType)
  @IsOptional()
  @Field(() => EnumRequestType, {
    nullable: true,
  })
  requestType?:
      | "moving_in"
      | "moving_out"
      | "intercom_change"
      | "access_request"
      | "violation_report"
      | "deficiency_report"
      | "question"
      | null;

  @ApiProperty({
    required: false,
    enum: EnumRequestStatus,
  })
  @IsEnum(EnumRequestStatus)
  @IsOptional()
  @Field(() => EnumRequestStatus, {
    nullable: true,
  })
  status?:
      | "New"
      | "In_Progress"
      | "Pending_Approval"
      | "Approved"
      | "Disapproved"
      | "Complete"
      | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    type: () => CondoUnit,
  })
  @ValidateNested()
  @Type(() => CondoUnit)
  @IsOptional()
  condoUnit?: CondoUnit | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  elevator!: string | null;

  @ApiProperty({
    required: false,
    type: () => CompanyEmployee,
  })
  @ValidateNested()
  @Type(() => CompanyEmployee)
  @IsOptional()
  employee?: CompanyEmployee | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  key!: string | null;

  @ApiProperty({
    required: false,
    type: () => Property,
  })
  @ValidateNested()
  @Type(() => Property)
  @IsOptional()
  property?: Property | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  question!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  reportMessage!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  response!: string | null;

  @ApiProperty({
    required: false,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  @IsOptional()
  user?: User | null;
}

export { Request as RequestObject };
