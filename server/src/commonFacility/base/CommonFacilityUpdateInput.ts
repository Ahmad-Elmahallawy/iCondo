import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationUpdateManyWithoutCommonFacilitiesInput } from "./ReservationUpdateManyWithoutCommonFacilitiesInput";
import { ValidateNested, IsOptional, IsEnum, IsString } from "class-validator";
import { Type } from "class-transformer";
import { EnumCommonFacilityType } from "./EnumCommonFacilityType";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
@InputType()
class CommonFacilityUpdateInput {
  @ApiProperty({
    required: false,
    type: () => ReservationUpdateManyWithoutCommonFacilitiesInput,
  })
  @ValidateNested()
  @Type(() => ReservationUpdateManyWithoutCommonFacilitiesInput)
  @IsOptional()
  @Field(() => ReservationUpdateManyWithoutCommonFacilitiesInput, {
    nullable: true,
  })
  availabilities?: ReservationUpdateManyWithoutCommonFacilitiesInput;

  @ApiProperty({
    required: false,
    enum: EnumCommonFacilityType,
  })
  @IsEnum(EnumCommonFacilityType)
  @IsOptional()
  @Field(() => EnumCommonFacilityType, {
    nullable: true,
  })
  facilityType?: "sky_lounge" | "spa_fitness" | "sauna" | null;

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
  status?: string | null;
}

export { CommonFacilityUpdateInput as CommonFacilityUpdateInput };
