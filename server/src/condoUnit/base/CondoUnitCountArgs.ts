import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereInput } from "./CondoUnitWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class CondoUnitCountArgs {
  @ApiProperty({
    required: false,
    type: () => CondoUnitWhereInput,
  })
  @Field(() => CondoUnitWhereInput, { nullable: true })
  @Type(() => CondoUnitWhereInput)
  where?: CondoUnitWhereInput;
}

export { CondoUnitCountArgs as CondoUnitCountArgs };
