import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { IntFilter } from "../../util/IntFilter";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { RequestListRelationFilter } from "../../request/base/RequestListRelationFilter";
@InputType()
class CompanyEmployeeWhereInput {
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
    type: () => RequestListRelationFilter,
  })
  @ValidateNested()
  @Type(() => RequestListRelationFilter)
  @IsOptional()
  @Field(() => RequestListRelationFilter, {
    nullable: true,
  })
  requests?: RequestListRelationFilter;

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

export { CompanyEmployeeWhereInput as CompanyEmployeeWhereInput };
