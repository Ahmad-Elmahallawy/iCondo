import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ForumWhereInput } from "./ForumWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class ForumCountArgs {
  @ApiProperty({
    required: false,
    type: () => ForumWhereInput,
  })
  @Field(() => ForumWhereInput, { nullable: true })
  @Type(() => ForumWhereInput)
  where?: ForumWhereInput;
}

export { ForumCountArgs as ForumCountArgs };
