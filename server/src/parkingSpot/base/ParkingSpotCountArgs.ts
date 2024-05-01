import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ParkingSpotWhereInput } from "./ParkingSpotWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class ParkingSpotCountArgs {
  @ApiProperty({
    required: false,
    type: () => ParkingSpotWhereInput,
  })
  @Field(() => ParkingSpotWhereInput, { nullable: true })
  @Type(() => ParkingSpotWhereInput)
  where?: ParkingSpotWhereInput;
}

export { ParkingSpotCountArgs as ParkingSpotCountArgs };
