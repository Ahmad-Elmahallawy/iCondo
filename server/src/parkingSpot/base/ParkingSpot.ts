import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { ValidateNested, IsOptional, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { Property } from "../../property/base/Property";

@ObjectType()
class ParkingSpot {
  @ApiProperty({
    required: false,
    type: () => CondoUnit,
  })
  @ValidateNested()
  @Type(() => CondoUnit)
  @IsOptional()
  condoUnit?: CondoUnit | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: () => Property,
  })
  @ValidateNested()
  @Type(() => Property)
  @IsOptional()
  property?: Property | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}

export { ParkingSpot as ParkingSpot };
