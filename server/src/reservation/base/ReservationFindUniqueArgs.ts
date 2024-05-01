import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationWhereUniqueInput } from "./ReservationWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class ReservationFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => ReservationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ReservationWhereUniqueInput)
  @Field(() => ReservationWhereUniqueInput, { nullable: false })
  where!: ReservationWhereUniqueInput;
}

export { ReservationFindUniqueArgs as ReservationFindUniqueArgs };
