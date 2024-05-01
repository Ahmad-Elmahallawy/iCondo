import { InputType, Field } from "@nestjs/graphql";
import { ParkingSpotWhereUniqueInput } from "../../parkingSpot/base/ParkingSpotWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ParkingSpotCreateNestedManyWithoutPropertiesInput {
  @Field(() => [ParkingSpotWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ParkingSpotWhereUniqueInput],
  })
  connect?: Array<ParkingSpotWhereUniqueInput>;
}

export { ParkingSpotCreateNestedManyWithoutPropertiesInput as ParkingSpotCreateNestedManyWithoutPropertiesInput };
