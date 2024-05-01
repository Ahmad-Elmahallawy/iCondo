import { InputType, Field } from "@nestjs/graphql";
import { ParkingSpotWhereUniqueInput } from "../../parkingSpot/base/ParkingSpotWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ParkingSpotUpdateManyWithoutPropertiesInput {
  @Field(() => [ParkingSpotWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ParkingSpotWhereUniqueInput],
  })
  connect?: Array<ParkingSpotWhereUniqueInput>;

  @Field(() => [ParkingSpotWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ParkingSpotWhereUniqueInput],
  })
  disconnect?: Array<ParkingSpotWhereUniqueInput>;

  @Field(() => [ParkingSpotWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ParkingSpotWhereUniqueInput],
  })
  set?: Array<ParkingSpotWhereUniqueInput>;
}

export { ParkingSpotUpdateManyWithoutPropertiesInput as ParkingSpotUpdateManyWithoutPropertiesInput };
