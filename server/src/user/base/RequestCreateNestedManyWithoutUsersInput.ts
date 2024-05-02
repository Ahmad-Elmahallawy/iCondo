import { InputType, Field } from "@nestjs/graphql";
import { RequestWhereUniqueInput } from "../../request/base/RequestWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class RequestCreateNestedManyWithoutUsersInput {
  @Field(() => [RequestWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RequestWhereUniqueInput],
  })
  connect?: Array<RequestWhereUniqueInput>;
}

export { RequestCreateNestedManyWithoutUsersInput as RequestCreateNestedManyWithoutUsersInput };
