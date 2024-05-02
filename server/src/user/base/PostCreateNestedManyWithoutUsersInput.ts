import { InputType, Field } from "@nestjs/graphql";
import { PostWhereUniqueInput } from "../../post/base/PostWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class PostCreateNestedManyWithoutUsersInput {
  @Field(() => [PostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PostWhereUniqueInput],
  })
  connect?: Array<PostWhereUniqueInput>;
}

export { PostCreateNestedManyWithoutUsersInput as PostCreateNestedManyWithoutUsersInput };
