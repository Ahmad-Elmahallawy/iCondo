import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { EnumRequestType } from "./EnumRequestType";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { EnumRequestStatus } from "./EnumRequestStatus";
@InputType()
class RequestUpdateInput {
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
}

export { RequestUpdateInput as RequestUpdateInput };
