import { InputType, Field } from "@nestjs/graphql";
import { UserCondoWhereUniqueInput } from "../../userCondo/base/UserCondoWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class UserCondoCreateNestedManyWithoutUsersInput {
  @Field(() => [UserCondoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserCondoWhereUniqueInput],
  })
  connect?: Array<UserCondoWhereUniqueInput>;
}

export { UserCondoCreateNestedManyWithoutUsersInput as UserCondoCreateNestedManyWithoutUsersInput };
