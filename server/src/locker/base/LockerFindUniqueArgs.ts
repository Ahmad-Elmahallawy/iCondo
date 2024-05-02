import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LockerWhereUniqueInput } from "./LockerWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class LockerFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => LockerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => LockerWhereUniqueInput)
  @Field(() => LockerWhereUniqueInput, { nullable: false })
  where!: LockerWhereUniqueInput;
}

export { LockerFindUniqueArgs as LockerFindUniqueArgs };
