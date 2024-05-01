import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ParkingSpotWhereUniqueInput } from "./ParkingSpotWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ParkingSpotUpdateInput } from "./ParkingSpotUpdateInput";

@ArgsType()
class UpdateParkingSpotArgs {
  @ApiProperty({
    required: true,
    type: () => ParkingSpotWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotWhereUniqueInput)
  @Field(() => ParkingSpotWhereUniqueInput, { nullable: false })
  where!: ParkingSpotWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => ParkingSpotUpdateInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotUpdateInput)
  @Field(() => ParkingSpotUpdateInput, { nullable: false })
  data!: ParkingSpotUpdateInput;
}

export { UpdateParkingSpotArgs as UpdateParkingSpotArgs };
