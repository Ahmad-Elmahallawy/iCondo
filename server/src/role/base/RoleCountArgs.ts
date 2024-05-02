import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RoleWhereInput } from "./RoleWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class RoleCountArgs {
  @ApiProperty({
    required: false,
    type: () => RoleWhereInput,
  })
  @Field(() => RoleWhereInput, { nullable: true })
  @Type(() => RoleWhereInput)
  where?: RoleWhereInput;
}

export { RoleCountArgs as RoleCountArgs };
