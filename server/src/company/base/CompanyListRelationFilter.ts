import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereInput } from "./CompanyWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class CompanyListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => CompanyWhereInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereInput)
  @IsOptional()
  @Field(() => CompanyWhereInput, {
    nullable: true,
  })
  every?: CompanyWhereInput;

  @ApiProperty({
    required: false,
    type: () => CompanyWhereInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereInput)
  @IsOptional()
  @Field(() => CompanyWhereInput, {
    nullable: true,
  })
  some?: CompanyWhereInput;

  @ApiProperty({
    required: false,
    type: () => CompanyWhereInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereInput)
  @IsOptional()
  @Field(() => CompanyWhereInput, {
    nullable: true,
  })
  none?: CompanyWhereInput;
}
export { CompanyListRelationFilter as CompanyListRelationFilter };
