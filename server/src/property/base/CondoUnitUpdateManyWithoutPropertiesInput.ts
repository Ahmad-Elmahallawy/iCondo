import { InputType, Field } from "@nestjs/graphql";
import { CondoUnitWhereUniqueInput } from "../../condoUnit/base/CondoUnitWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CondoUnitUpdateManyWithoutPropertiesInput {
  @Field(() => [CondoUnitWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CondoUnitWhereUniqueInput],
  })
  connect?: Array<CondoUnitWhereUniqueInput>;

  @Field(() => [CondoUnitWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CondoUnitWhereUniqueInput],
  })
  disconnect?: Array<CondoUnitWhereUniqueInput>;

  @Field(() => [CondoUnitWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [CondoUnitWhereUniqueInput],
  })
  set?: Array<CondoUnitWhereUniqueInput>;
}

export { CondoUnitUpdateManyWithoutPropertiesInput as CondoUnitUpdateManyWithoutPropertiesInput };
