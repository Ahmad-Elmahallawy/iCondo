import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LockerWhereUniqueInput } from "./LockerWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { LockerUpdateInput } from "./LockerUpdateInput";

@ArgsType()
class UpdateLockerArgs {
  @ApiProperty({
    required: true,
    type: () => LockerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => LockerWhereUniqueInput)
  @Field(() => LockerWhereUniqueInput, { nullable: false })
  where!: LockerWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => LockerUpdateInput,
  })
  @ValidateNested()
  @Type(() => LockerUpdateInput)
  @Field(() => LockerUpdateInput, { nullable: false })
  data!: LockerUpdateInput;
}

export { UpdateLockerArgs as UpdateLockerArgs };
