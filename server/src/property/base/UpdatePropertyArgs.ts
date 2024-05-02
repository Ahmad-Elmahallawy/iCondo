import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PropertyWhereUniqueInput } from "./PropertyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PropertyUpdateInput } from "./PropertyUpdateInput";

@ArgsType()
class UpdatePropertyArgs {
  @ApiProperty({
    required: true,
    type: () => PropertyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereUniqueInput)
  @Field(() => PropertyWhereUniqueInput, { nullable: false })
  where!: PropertyWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => PropertyUpdateInput,
  })
  @ValidateNested()
  @Type(() => PropertyUpdateInput)
  @Field(() => PropertyUpdateInput, { nullable: false })
  data!: PropertyUpdateInput;
}

export { UpdatePropertyArgs as UpdatePropertyArgs };
