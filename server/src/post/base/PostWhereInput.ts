import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { ForumWhereUniqueInput } from "../../forum/base/ForumWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { StringFilter } from "../../util/StringFilter";
import { ReplyListRelationFilter } from "../../reply/base/ReplyListRelationFilter";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";

@InputType()
class PostWhereInput {
  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  content?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: () => ForumWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ForumWhereUniqueInput)
  @IsOptional()
  @Field(() => ForumWhereUniqueInput, {
    nullable: true,
  })
  forum?: ForumWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => ReplyListRelationFilter,
  })
  @ValidateNested()
  @Type(() => ReplyListRelationFilter)
  @IsOptional()
  @Field(() => ReplyListRelationFilter, {
    nullable: true,
  })
  replies?: ReplyListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  user?: UserWhereUniqueInput;
}

export { PostWhereInput as PostWhereInput };
