import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PostWhereInput } from "./PostWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class PostListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => PostWhereInput,
  })
  @ValidateNested()
  @Type(() => PostWhereInput)
  @IsOptional()
  @Field(() => PostWhereInput, {
    nullable: true,
  })
  every?: PostWhereInput;

  @ApiProperty({
    required: false,
    type: () => PostWhereInput,
  })
  @ValidateNested()
  @Type(() => PostWhereInput)
  @IsOptional()
  @Field(() => PostWhereInput, {
    nullable: true,
  })
  some?: PostWhereInput;

  @ApiProperty({
    required: false,
    type: () => PostWhereInput,
  })
  @ValidateNested()
  @Type(() => PostWhereInput)
  @IsOptional()
  @Field(() => PostWhereInput, {
    nullable: true,
  })
  none?: PostWhereInput;
}
export { PostListRelationFilter as PostListRelationFilter };
