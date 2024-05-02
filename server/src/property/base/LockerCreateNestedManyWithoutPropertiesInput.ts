import { InputType, Field } from "@nestjs/graphql";
import { LockerWhereUniqueInput } from "../../locker/base/LockerWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class LockerCreateNestedManyWithoutPropertiesInput {
  @Field(() => [LockerWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [LockerWhereUniqueInput],
  })
  connect?: Array<LockerWhereUniqueInput>;
}

export { LockerCreateNestedManyWithoutPropertiesInput as LockerCreateNestedManyWithoutPropertiesInput };
