import { InputType, Field } from "@nestjs/graphql";
import { RequestWhereUniqueInput } from "../../request/base/RequestWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class RequestCreateNestedManyWithoutCondoUnitsInput {
  @Field(() => [RequestWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RequestWhereUniqueInput],
  })
  connect?: Array<RequestWhereUniqueInput>;
}

export { RequestCreateNestedManyWithoutCondoUnitsInput as RequestCreateNestedManyWithoutCondoUnitsInput };
