import { InputType, Field } from "@nestjs/graphql";
import { LockerWhereUniqueInput } from "../../locker/base/LockerWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class LockerUpdateManyWithoutPropertiesInput {
  @Field(() => [LockerWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [LockerWhereUniqueInput],
  })
  connect?: Array<LockerWhereUniqueInput>;

  @Field(() => [LockerWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [LockerWhereUniqueInput],
  })
  disconnect?: Array<LockerWhereUniqueInput>;

  @Field(() => [LockerWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [LockerWhereUniqueInput],
  })
  set?: Array<LockerWhereUniqueInput>;
}

export { LockerUpdateManyWithoutPropertiesInput as LockerUpdateManyWithoutPropertiesInput };
