import { InputType, Field } from "@nestjs/graphql";
import { UserCondoWhereUniqueInput } from "../../userCondo/base/UserCondoWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class UserCondoUpdateManyWithoutUsersInput {
  @Field(() => [UserCondoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserCondoWhereUniqueInput],
  })
  connect?: Array<UserCondoWhereUniqueInput>;

  @Field(() => [UserCondoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserCondoWhereUniqueInput],
  })
  disconnect?: Array<UserCondoWhereUniqueInput>;

  @Field(() => [UserCondoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserCondoWhereUniqueInput],
  })
  set?: Array<UserCondoWhereUniqueInput>;
}

export { UserCondoUpdateManyWithoutUsersInput as UserCondoUpdateManyWithoutUsersInput };
