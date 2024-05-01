import { InputType, Field } from "@nestjs/graphql";
import { PostWhereUniqueInput } from "../../post/base/PostWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class PostUpdateManyWithoutUsersInput {
  @Field(() => [PostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PostWhereUniqueInput],
  })
  connect?: Array<PostWhereUniqueInput>;

  @Field(() => [PostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PostWhereUniqueInput],
  })
  disconnect?: Array<PostWhereUniqueInput>;

  @Field(() => [PostWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [PostWhereUniqueInput],
  })
  set?: Array<PostWhereUniqueInput>;
}

export { PostUpdateManyWithoutUsersInput as PostUpdateManyWithoutUsersInput };
