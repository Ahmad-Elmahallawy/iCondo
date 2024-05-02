import { InputType, Field } from "@nestjs/graphql";
import { ParkingSpotWhereUniqueInput } from "../../parkingSpot/base/ParkingSpotWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ParkingSpotCreateNestedManyWithoutCondoUnitsInput {
  @Field(() => [ParkingSpotWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ParkingSpotWhereUniqueInput],
  })
  connect?: Array<ParkingSpotWhereUniqueInput>;
}

export { ParkingSpotCreateNestedManyWithoutCondoUnitsInput as ParkingSpotCreateNestedManyWithoutCondoUnitsInput };
