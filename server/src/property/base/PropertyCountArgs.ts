import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PropertyWhereInput } from "./PropertyWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class PropertyCountArgs {
  @ApiProperty({
    required: false,
    type: () => PropertyWhereInput,
  })
  @Field(() => PropertyWhereInput, { nullable: true })
  @Type(() => PropertyWhereInput)
  where?: PropertyWhereInput;
}

export { PropertyCountArgs as PropertyCountArgs };
