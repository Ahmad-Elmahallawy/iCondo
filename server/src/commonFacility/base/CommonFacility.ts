import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Reservation } from "../../reservation/base/Reservation";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsEnum,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { EnumCommonFacilityType } from "./EnumCommonFacilityType";
import { Property } from "../../property/base/Property";
@ObjectType()
class CommonFacility {
  @ApiProperty({
    required: false,
    type: () => [Reservation],
  })
  @ValidateNested()
  @Type(() => Reservation)
  @IsOptional()
  availabilities?: Array<Reservation>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: false,
    type: () => Property,
  })
  @ValidateNested()
  @Type(() => Property)
  @IsOptional()
  property?: Property | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  status!: string | null;
  
}

export { CommonFacility as CommonFacility };
