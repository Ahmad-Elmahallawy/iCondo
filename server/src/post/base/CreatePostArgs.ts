import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PostCreateInput } from "./PostCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreatePostArgs {
  @ApiProperty({
    required: true,
    type: () => PostCreateInput,
  })
  @ValidateNested()
  @Type(() => PostCreateInput)
  @Field(() => PostCreateInput, { nullable: false })
  data!: PostCreateInput;
}

export { CreatePostArgs as CreatePostArgs };
