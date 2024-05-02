
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PostWhereInput } from "./PostWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class PostCountArgs {
  @ApiProperty({
    required: false,
    type: () => PostWhereInput,
  })
  @Field(() => PostWhereInput, { nullable: true })
  @Type(() => PostWhereInput)
  where?: PostWhereInput;
}

export { PostCountArgs as PostCountArgs };
