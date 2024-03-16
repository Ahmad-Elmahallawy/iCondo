import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationUpdateManyWithoutCommonFacilitiesInput } from "./ReservationUpdateManyWithoutCommonFacilitiesInput";
import { ValidateNested, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { EnumCommonFacilityType } from "./EnumCommonFacilityType";

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
}

export { CommonFacilityUpdateInput as CommonFacilityUpdateInput };
