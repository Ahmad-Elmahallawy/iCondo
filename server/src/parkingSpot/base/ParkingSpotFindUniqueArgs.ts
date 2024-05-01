import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ParkingSpotWhereUniqueInput } from "./ParkingSpotWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class ParkingSpotFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => ParkingSpotWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotWhereUniqueInput)
  @Field(() => ParkingSpotWhereUniqueInput, { nullable: false })
  where!: ParkingSpotWhereUniqueInput;
}

export { ParkingSpotFindUniqueArgs as ParkingSpotFindUniqueArgs };
