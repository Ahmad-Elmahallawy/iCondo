import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PostWhereUniqueInput } from "./PostWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PostUpdateInput } from "./PostUpdateInput";

@ArgsType()
class UpdatePostArgs {
  @ApiProperty({
    required: true,
    type: () => PostWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PostWhereUniqueInput)
  @Field(() => PostWhereUniqueInput, { nullable: false })
  where!: PostWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => PostUpdateInput,
  })
  @ValidateNested()
  @Type(() => PostUpdateInput)
  @Field(() => PostUpdateInput, { nullable: false })
  data!: PostUpdateInput;
}

export { UpdatePostArgs as UpdatePostArgs };
