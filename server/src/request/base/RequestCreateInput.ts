import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional, IsEnum, IsString } from "class-validator";
import { Type } from "class-transformer";
import { EnumRequestType } from "./EnumRequestType";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { EnumRequestStatus } from "./EnumRequestStatus";
import { CondoUnitWhereUniqueInput } from "../../condoUnit/base/CondoUnitWhereUniqueInput";
import { CompanyEmployeeWhereUniqueInput } from "../../companyEmployee/base/CompanyEmployeeWhereUniqueInput";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { NotificationCreateNestedManyWithoutRequestsInput } from "./NotificationCreateNestedManyWithoutRequestsInput";

@InputType()
class RequestCreateInput {
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
    type: () => NotificationCreateNestedManyWithoutRequestsInput,
  })
  @ValidateNested()
  @Type(() => NotificationCreateNestedManyWithoutRequestsInput)
  @IsOptional()
  @Field(() => NotificationCreateNestedManyWithoutRequestsInput, {
    nullable: true,
  })
  notifications?: NotificationCreateNestedManyWithoutRequestsInput;

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
    type: () => CondoUnitWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereUniqueInput)
  @IsOptional()
  @Field(() => CondoUnitWhereUniqueInput, {
    nullable: true,
  })
  condoUnit?: CondoUnitWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  elevator?: string | null;

  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeWhereUniqueInput)
  @IsOptional()
  @Field(() => CompanyEmployeeWhereUniqueInput, {
    nullable: true,
  })
  employee?: CompanyEmployeeWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  key?: string | null;

  @ApiProperty({
    required: false,
    type: () => PropertyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereUniqueInput)
  @IsOptional()
  @Field(() => PropertyWhereUniqueInput, {
    nullable: true,
  })
  property?: PropertyWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  question?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  reportMessage?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  response?: string | null;
}

export { RequestCreateInput as RequestCreateInput };
