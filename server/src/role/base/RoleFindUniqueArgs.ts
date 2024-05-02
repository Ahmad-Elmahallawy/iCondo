import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class RoleFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => RoleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RoleWhereUniqueInput)
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;
}

export { RoleFindUniqueArgs as RoleFindUniqueArgs };
