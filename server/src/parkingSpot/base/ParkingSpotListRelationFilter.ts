import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ParkingSpotWhereInput } from "./ParkingSpotWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ParkingSpotListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => ParkingSpotWhereInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotWhereInput)
  @IsOptional()
  @Field(() => ParkingSpotWhereInput, {
    nullable: true,
  })
  every?: ParkingSpotWhereInput;

  @ApiProperty({
    required: false,
    type: () => ParkingSpotWhereInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotWhereInput)
  @IsOptional()
  @Field(() => ParkingSpotWhereInput, {
    nullable: true,
  })
  some?: ParkingSpotWhereInput;

  @ApiProperty({
    required: false,
    type: () => ParkingSpotWhereInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotWhereInput)
  @IsOptional()
  @Field(() => ParkingSpotWhereInput, {
    nullable: true,
  })
  none?: ParkingSpotWhereInput;
}
export { ParkingSpotListRelationFilter as ParkingSpotListRelationFilter };
