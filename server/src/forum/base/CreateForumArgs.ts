import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ForumCreateInput } from "./ForumCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateForumArgs {
  @ApiProperty({
    required: true,
    type: () => ForumCreateInput,
  })
  @ValidateNested()
  @Type(() => ForumCreateInput)
  @Field(() => ForumCreateInput, { nullable: false })
  data!: ForumCreateInput;
}

export { CreateForumArgs as CreateForumArgs };
