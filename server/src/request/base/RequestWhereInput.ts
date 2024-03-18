import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { StringFilter } from "../../util/StringFilter";
import { EnumRequestType } from "./EnumRequestType";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { EnumRequestStatus } from "./EnumRequestStatus";

@InputType()
class RequestWhereInput {
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
  company?: CompanyWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

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
    | "question";

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
      | "Complete";
  
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
  user?: UserWhereUniqueInput;
}

export { RequestWhereInput as RequestWhereInput };
