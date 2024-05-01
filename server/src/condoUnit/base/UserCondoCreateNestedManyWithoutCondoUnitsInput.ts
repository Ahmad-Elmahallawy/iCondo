import { InputType, Field } from "@nestjs/graphql";
import { UserCondoWhereUniqueInput } from "../../userCondo/base/UserCondoWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class UserCondoCreateNestedManyWithoutCondoUnitsInput {
  @Field(() => [UserCondoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [UserCondoWhereUniqueInput],
  })
  connect?: Array<UserCondoWhereUniqueInput>;
}

export { UserCondoCreateNestedManyWithoutCondoUnitsInput as UserCondoCreateNestedManyWithoutCondoUnitsInput };
