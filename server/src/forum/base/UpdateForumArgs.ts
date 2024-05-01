import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ForumWhereUniqueInput } from "./ForumWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ForumUpdateInput } from "./ForumUpdateInput";

@ArgsType()
class UpdateForumArgs {
  @ApiProperty({
    required: true,
    type: () => ForumWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ForumWhereUniqueInput)
  @Field(() => ForumWhereUniqueInput, { nullable: false })
  where!: ForumWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => ForumUpdateInput,
  })
  @ValidateNested()
  @Type(() => ForumUpdateInput)
  @Field(() => ForumUpdateInput, { nullable: false })
  data!: ForumUpdateInput;
}

export { UpdateForumArgs as UpdateForumArgs };
