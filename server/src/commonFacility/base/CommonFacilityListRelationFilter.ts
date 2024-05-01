import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommonFacilityWhereInput } from "./CommonFacilityWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class CommonFacilityListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => CommonFacilityWhereInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityWhereInput)
  @IsOptional()
  @Field(() => CommonFacilityWhereInput, {
    nullable: true,
  })
  every?: CommonFacilityWhereInput;

  @ApiProperty({
    required: false,
    type: () => CommonFacilityWhereInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityWhereInput)
  @IsOptional()
  @Field(() => CommonFacilityWhereInput, {
    nullable: true,
  })
  some?: CommonFacilityWhereInput;

  @ApiProperty({
    required: false,
    type: () => CommonFacilityWhereInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityWhereInput)
  @IsOptional()
  @Field(() => CommonFacilityWhereInput, {
    nullable: true,
  })
  none?: CommonFacilityWhereInput;
}
export { CommonFacilityListRelationFilter as CommonFacilityListRelationFilter };
