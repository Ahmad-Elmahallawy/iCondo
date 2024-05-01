import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PostWhereUniqueInput } from "./PostWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class PostFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => PostWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PostWhereUniqueInput)
  @Field(() => PostWhereUniqueInput, { nullable: false })
  where!: PostWhereUniqueInput;
}

export { PostFindUniqueArgs as PostFindUniqueArgs };
