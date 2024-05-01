import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PropertyWhereUniqueInput } from "./PropertyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class DeletePropertyArgs {
  @ApiProperty({
    required: true,
    type: () => PropertyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereUniqueInput)
  @Field(() => PropertyWhereUniqueInput, { nullable: false })
  where!: PropertyWhereUniqueInput;
}

export { DeletePropertyArgs as DeletePropertyArgs };
