import { InputType, Field } from "@nestjs/graphql";
import { ReservationWhereUniqueInput } from "../../reservation/base/ReservationWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ReservationUpdateManyWithoutUsersInput {
  @Field(() => [ReservationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ReservationWhereUniqueInput],
  })
  connect?: Array<ReservationWhereUniqueInput>;

  @Field(() => [ReservationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ReservationWhereUniqueInput],
  })
  disconnect?: Array<ReservationWhereUniqueInput>;

  @Field(() => [ReservationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ReservationWhereUniqueInput],
  })
  set?: Array<ReservationWhereUniqueInput>;
}

export { ReservationUpdateManyWithoutUsersInput as ReservationUpdateManyWithoutUsersInput };
