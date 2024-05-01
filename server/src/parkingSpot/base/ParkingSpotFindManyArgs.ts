import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ParkingSpotWhereInput } from "./ParkingSpotWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ParkingSpotOrderByInput } from "./ParkingSpotOrderByInput";

@ArgsType()
class ParkingSpotFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ParkingSpotWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => ParkingSpotWhereInput, { nullable: true })
  @Type(() => ParkingSpotWhereInput)
  where?: ParkingSpotWhereInput;

  @ApiProperty({
    required: false,
    type: [ParkingSpotOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [ParkingSpotOrderByInput], { nullable: true })
  @Type(() => ParkingSpotOrderByInput)
  orderBy?: Array<ParkingSpotOrderByInput>;

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

export { ParkingSpotFindManyArgs as ParkingSpotFindManyArgs };
