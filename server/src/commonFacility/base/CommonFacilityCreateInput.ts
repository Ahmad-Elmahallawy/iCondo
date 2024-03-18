import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationCreateNestedManyWithoutCommonFacilitiesInput } from "./ReservationCreateNestedManyWithoutCommonFacilitiesInput";
import { ValidateNested, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { EnumCommonFacilityType } from "./EnumCommonFacilityType";

@InputType()
class CommonFacilityCreateInput {
  @ApiProperty({
    required: false,
    type: () => ReservationCreateNestedManyWithoutCommonFacilitiesInput,
  })
  @ValidateNested()
  @Type(() => ReservationCreateNestedManyWithoutCommonFacilitiesInput)
  @IsOptional()
  @Field(() => ReservationCreateNestedManyWithoutCommonFacilitiesInput, {
    nullable: true,
  })
  availabilities?: ReservationCreateNestedManyWithoutCommonFacilitiesInput;

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
}

export { CommonFacilityCreateInput as CommonFacilityCreateInput };
