import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ParkingSpotCreateInput } from "./ParkingSpotCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateParkingSpotArgs {
  @ApiProperty({
    required: true,
    type: () => ParkingSpotCreateInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotCreateInput)
  @Field(() => ParkingSpotCreateInput, { nullable: false })
  data!: ParkingSpotCreateInput;
}

export { CreateParkingSpotArgs as CreateParkingSpotArgs };
