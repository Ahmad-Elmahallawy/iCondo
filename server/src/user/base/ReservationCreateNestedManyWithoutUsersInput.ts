import { InputType, Field } from "@nestjs/graphql";
import { ReservationWhereUniqueInput } from "../../reservation/base/ReservationWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ReservationCreateNestedManyWithoutUsersInput {
  @Field(() => [ReservationWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ReservationWhereUniqueInput],
  })
  connect?: Array<ReservationWhereUniqueInput>;
}

export { ReservationCreateNestedManyWithoutUsersInput as ReservationCreateNestedManyWithoutUsersInput };
