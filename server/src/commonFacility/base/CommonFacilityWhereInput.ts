import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationListRelationFilter } from "../../reservation/base/ReservationListRelationFilter";
import { ValidateNested, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { EnumCommonFacilityType } from "./EnumCommonFacilityType";
import { StringFilter } from "../../util/StringFilter";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
@InputType()
class CommonFacilityWhereInput {
  @ApiProperty({
    required: false,
    type: () => ReservationListRelationFilter,
  })
  @ValidateNested()
  @Type(() => ReservationListRelationFilter)
  @IsOptional()
  @Field(() => ReservationListRelationFilter, {
    nullable: true,
  })
  availabilities?: ReservationListRelationFilter;

  @ApiProperty({
    required: false,
    enum: EnumCommonFacilityType,
  })
  @IsEnum(EnumCommonFacilityType)
  @IsOptional()
  @Field(() => EnumCommonFacilityType, {
    nullable: true,
  })
  facilityType?: "sky_lounge" | "spa_fitness" | "sauna";

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
    type: () => PropertyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereUniqueInput)
  @IsOptional()
  @Field(() => PropertyWhereUniqueInput, {
    nullable: true,
  })
  property?: PropertyWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  status?: StringNullableFilter;
}

export { CommonFacilityWhereInput as CommonFacilityWhereInput };
