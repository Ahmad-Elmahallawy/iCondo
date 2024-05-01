import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationCreateInput } from "./ReservationCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateReservationArgs {
  @ApiProperty({
    required: true,
    type: () => ReservationCreateInput,
  })
  @ValidateNested()
  @Type(() => ReservationCreateInput)
  @Field(() => ReservationCreateInput, { nullable: false })
  data!: ReservationCreateInput;
}

export { CreateReservationArgs as CreateReservationArgs };
