import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { RoleUpdateInput } from "./RoleUpdateInput";

@ArgsType()
class UpdateRoleArgs {
  @ApiProperty({
    required: true,
    type: () => RoleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RoleWhereUniqueInput)
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => RoleUpdateInput,
  })
  @ValidateNested()
  @Type(() => RoleUpdateInput)
  @Field(() => RoleUpdateInput, { nullable: false })
  data!: RoleUpdateInput;
}

export { UpdateRoleArgs as UpdateRoleArgs };
