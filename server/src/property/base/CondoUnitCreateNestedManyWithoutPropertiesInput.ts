import { InputType, Field } from "@nestjs/graphql";
import { CondoUnitWhereUniqueInput } from "../../condoUnit/base/CondoUnitWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CondoUnitCreateNestedManyWithoutPropertiesInput {
  @Field(() => [CondoUnitWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CondoUnitWhereUniqueInput],
  })
  connect?: Array<CondoUnitWhereUniqueInput>;
}

export { CondoUnitCreateNestedManyWithoutPropertiesInput as CondoUnitCreateNestedManyWithoutPropertiesInput };
