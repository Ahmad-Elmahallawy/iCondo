import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LockerWhereInput } from "./LockerWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class LockerCountArgs {
  @ApiProperty({
    required: false,
    type: () => LockerWhereInput,
  })
  @Field(() => LockerWhereInput, { nullable: true })
  @Type(() => LockerWhereInput)
  where?: LockerWhereInput;
}

export { LockerCountArgs as LockerCountArgs };
