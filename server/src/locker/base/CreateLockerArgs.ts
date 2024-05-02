import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LockerCreateInput } from "./LockerCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateLockerArgs {
  @ApiProperty({
    required: true,
    type: () => LockerCreateInput,
  })
  @ValidateNested()
  @Type(() => LockerCreateInput)
  @Field(() => LockerCreateInput, { nullable: false })
  data!: LockerCreateInput;
}

export { CreateLockerArgs as CreateLockerArgs };
