import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationWhereInput } from "./ReservationWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class ReservationCountArgs {
  @ApiProperty({
    required: false,
    type: () => ReservationWhereInput,
  })
  @Field(() => ReservationWhereInput, { nullable: true })
  @Type(() => ReservationWhereInput)
  where?: ReservationWhereInput;
}

export { ReservationCountArgs as ReservationCountArgs };
