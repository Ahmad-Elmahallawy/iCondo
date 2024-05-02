import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommonFacilityWhereInput } from "./CommonFacilityWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { CommonFacilityOrderByInput } from "./CommonFacilityOrderByInput";

@ArgsType()
class CommonFacilityFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CommonFacilityWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => CommonFacilityWhereInput, { nullable: true })
  @Type(() => CommonFacilityWhereInput)
  where?: CommonFacilityWhereInput;

  @ApiProperty({
    required: false,
    type: [CommonFacilityOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [CommonFacilityOrderByInput], { nullable: true })
  @Type(() => CommonFacilityOrderByInput)
  orderBy?: Array<CommonFacilityOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { CommonFacilityFindManyArgs as CommonFacilityFindManyArgs };
